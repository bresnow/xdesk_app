import GObject from "gi://GObject";
import Soup from "gi://Soup?version=3.0";
import GLib from "gi://GLib";
const { boolean, double, string } = GObject.ParamSpec;
const { READWRITE, READABLE } = GObject.ParamFlags;
export const WebSocket = GObject.registerClass(
  {
    GTypeName: "WebSocket",
    Properties: {
      url: string("url", "url", "URL to connect to WebSocket", READWRITE, ""),
      readyState: double(
        "readyState",
        "readyState",
        "Ready State",
        READABLE,
        0,
        3,
        0
      ),
    },
  },
  class extends GObject.Object {
    url;
    readyState;
    _connection;
    onopen;
    onmessage;
    onerror;
    onclose;
    constructor(url, protocols) {
      super();
      const uri = GLib.Uri.parse(url, GLib.UriFlags.NONE);
      this.url = uri.to_string();
      this.readyState = 0;
      if (typeof protocols === "string") {
        protocols = [protocols];
      }
      const session = new Soup.Session();
      const message = new Soup.Message({
        method: "GET",
        uri,
      });
      try {
        session.websocket_connect_async(
          message,
          this.url,
          protocols,
          null,
          null,
          (_self, resp) => {
            let connection = session.websocket_connect_finish(resp);
            this._connect(connection);
          }
        );
      } catch (error) {
        this._onerror(error);
      }
    }
    _connect(connection) {
      this._connection = connection;
      this._onopen();
      connection.connect("closed", () => {
        this._onclose();
      });
      connection.connect("error", (self, err) => {
        this._onerror(err);
      });
      connection.connect("message", (self, type, message) => {
        if (type === Soup.WebsocketDataType.TEXT) {
          const data = new TextDecoder().decode(message.unref_to_array());
          this._onmessage(data);
        } else {
          this._onmessage(message);
        }
      });
    }
    send(data) {
      if (typeof data === "string") {
        this._connection.send_message(
          Soup.WebsocketDataType.TEXT,
          new GLib.Bytes(new TextEncoder().encode(data))
        );
      } else {
        this._connection.send_message(Soup.WebsocketDataType.BINARY, data);
      }
    }
    close() {
      this.readyState = 2;
      this._connection.close(Soup.WebsocketCloseCode.NORMAL, null);
    }
    _onopen() {
      this.readyState = 1;
      if (typeof this.onopen === "function") {
        this.onopen();
      }
    }
    _onmessage(data) {
      if (typeof this.onmessage === "function") {
        this.onmessage(data);
      }
    }
    _onclose() {
      this.readyState = 3;
      if (typeof this.onclose === "function") {
        this.onclose();
      }
    }
    _onerror(err) {
      if (typeof this.onerror === "function") {
        this.onerror(err);
      }
    }
  }
);
export const WebSocketServer = GObject.registerClass(
  {
    GTypeName: "WebSocketServer",
    Properties: {
      isListening: boolean(
        "isListening",
        "isListening",
        "isListening",
        READWRITE,
        false
      ),
      port: double("port", "port", "port", READWRITE, 1024, 65535, 8080),
    },
  },
  class extends Soup.Server {
    isListening;
    port;
    wsConns;
    constructor(port) {
      super();
      this.isListening = false;
      this.port = null;
      this.wsConns = [];
      if (port) this.setListeningPort(port);
    }
    setListeningPort(port) {
      if (!port) return;
      const wasListening = this.isListening;
      if (wasListening) this.stopListening();
      this.port = port;
      if (wasListening) this.startListening();
    }
    startListening() {
      if (this.isListening || !this.port) return;
      let isListening = false;
      this.add_handler("/", this._onDefaultAccess.bind(this));
      this.add_websocket_handler(
        "/socket",
        null,
        null,
        this._onWsConnection.bind(this)
      );
      this.add_websocket_handler(
        "/amnion",
        null,
        null,
        this._onWsConnection.bind(this)
      );
      try {
        isListening = this.listen_local(
          this.port,
          Soup.ServerListenOptions.IPV4_ONLY
        );
      } catch (err) {
        log(err);
      }
      if (isListening) {
        const uris = this.get_uris();
        const usedPort = uris[0].get_port();
        log(`WebSocket server started listening on port: ${usedPort}`);
      } else {
        logError("WebSocket server could not start listening");
        this._closeCleanup();
      }
      this.isListening = isListening;
    }
    stopListening() {
      if (!this.isListening) return;
      this._closeCleanup();
      this.disconnect();
      this.isListening = false;
    }
    sendMessage(data) {
      for (const connection of this.wsConns) {
        if (connection.state !== Soup.WebsocketState.OPEN) continue;
        connection.send_text(JSON.stringify(data));
      }
    }
    passMsgData(action, value) {}
    _closeCleanup() {
      while (this.wsConns.length) {
        const connection = this.wsConns.pop();
        if (connection.state !== Soup.WebsocketState.OPEN) continue;
        connection.close(Soup.WebsocketCloseCode.NORMAL, null);
      }
      this.remove_handler("/amnion");
      this.remove_handler("/socket");
      this.remove_handler("/");
    }
    _onWsConnection(server, msg, path, connection) {
      log("new WebSocket connection");
      connection.connect("message", this._onWsMessage.bind(this));
      connection.connect("closed", this._onWsClosed.bind(this));
      this.wsConns.push(connection);
      log(`total WebSocket connections: ${this.wsConns.length}`);
    }
    _onWsMessage(_self, dataType, bytes) {
      const [success, parsedMsg] = parseData(dataType, bytes);
      if (success) this.passMsgData(parsedMsg.action, parsedMsg.value);
    }
    _onWsClosed(connection) {
      log("closed WebSocket connection");
      this.wsConns = this.wsConns.filter((conn) => conn !== connection);
      log(`remaining WebSocket connections: ${this.wsConns.length}`);
    }
    _onDefaultAccess(server, msg, path, query) {
      msg.set_status(200, null);
      msg
        .get_response_headers()
        .set_content_type("text/html", { charset: "UTF-8" });
      msg.get_response_body().append(`
<html>
<body>
Greetings, visitor... This is the namespace network point for ${msg.get_remote_host()}<br>
</body>
</html>
`);
    }
  }
);
export function parseData(dataType, bytes) {
  if (dataType !== Soup.WebsocketDataType.TEXT) {
    log("ignoring non-text WebSocket message");
    return [false];
  }
  let parsedMsg = null;
  const msg = bytes.get_data();
  try {
    parsedMsg = JSON.parse(new TextDecoder().decode(msg));
  } catch (err) {
    log(err);
  }
  if (!parsedMsg || !parsedMsg.action) {
    log('no "action" in parsed WebSocket message');
    return [false];
  }
  return [true, parsedMsg];
}
