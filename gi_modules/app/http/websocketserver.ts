import GObject from "gi://GObject"
import Soup from "gi://Soup?version=3.0"
const { boolean, double ,jsobject} = GObject.ParamSpec
const { READWRITE } = GObject.ParamFlags
type Props = Soup.Server_ConstructProps & { port?: number }
export const WebSocketServer = GObject.registerClass({
  GTypeName: 'SocketServer',
  Properties: {
    isListening: boolean('isListening', "isListening", "isListening", READWRITE, false),
    port: double('port', "port", "port", READWRITE, 1024, 65535, 8080),
  }
},
  class extends Soup.Server {
    isListening: boolean;
    port: number;
    wsConns: any[];
    constructor(port: number) {
     
      super();

      this.isListening = false;
      this.port = null;
      this.wsConns = [];

      if (port)
        this.setListeningPort(port);
    }

    setListeningPort(port: number) {
      if (!port)
        return;

      const wasListening = this.isListening;

      if (wasListening)
        this.stopListening();

      this.port = port;

      if (wasListening)
        this.startListening();
    }

    startListening() {
      if (this.isListening || !this.port)
        return;

      let isListening = false;

      this.add_handler('/', this._onDefaultAccess.bind(this));
      this.add_websocket_handler('/amnion', null, null, this._onWsConnection.bind(this));

      try {
        isListening = this.listen_local(this.port, Soup.ServerListenOptions.IPV4_ONLY);
      }
      catch (err) {
        log(err);
      }

      if (isListening) {
        const uris = this.get_uris();
        const usedPort = uris[0].get_port();
        log(`WebSocket server started listening on port: ${usedPort}`);
      }
      else {
        logError('WebSocket server could not start listening');
        this._closeCleanup();
      }

      this.isListening = isListening;
    }

    stopListening() {
      if (!this.isListening)
        return;

      this._closeCleanup();
      this.disconnect();

      this.isListening = false;
    }

    sendMessage(data: any) {
      for (const connection of this.wsConns) {
        if (connection.state !== Soup.WebsocketState.OPEN)
          continue;

        connection.send_text(JSON.stringify(data));
      }
    }

    passMsgData(action: any, value: any) {
    }

    _closeCleanup() {
      while (this.wsConns.length) {
        const connection = this.wsConns.pop();

        if (connection.state !== Soup.WebsocketState.OPEN)
          continue;

        connection.close(Soup.WebsocketCloseCode.NORMAL, null);
      }

      this.remove_handler('/amnion');
      this.remove_handler('/');
    }

    _onWsConnection(server: any, msg: any, path: any, connection: { connect: (arg0: string, arg1: any) => void }) {
      log('new WebSocket connection');

      connection.connect('message', this._onWsMessage.bind(this));
      connection.connect('closed', this._onWsClosed.bind(this));

      this.wsConns.push(connection);
      log(`total WebSocket connections: ${this.wsConns.length}`);
    }

    _onWsMessage(_self: any, dataType: any, bytes: any) {
      const [success, parsedMsg] = parseData(dataType, bytes);

      if (success)
        this.passMsgData(parsedMsg.action, parsedMsg.value);
    }

    _onWsClosed(connection: any) {
      log('closed WebSocket connection');

      this.wsConns = this.wsConns.filter(conn => conn !== connection);
      log(`remaining WebSocket connections: ${this.wsConns.length}`);
    }

    _onDefaultAccess(server: any, msg: { status_code: number }) {
      msg.status_code = 404;
    }
  });


function parseData(dataType: Soup.WebsocketDataType.TEXT | Soup.WebsocketDataType.BINARY, bytes: any) {
  if (dataType !== Soup.WebsocketDataType.TEXT) {
    log('ignoring non-text WebSocket message');
    return [false];
  }

  let parsedMsg = null;
  const msg = bytes.get_data();

  try {
    parsedMsg = JSON.parse(new TextDecoder().decode(msg));
  }
  catch (err) {
    log(err);
  }

  if (!parsedMsg || !parsedMsg.action) {
    log('no "action" in parsed WebSocket message');
    return [false];
  }

  return [true, parsedMsg];
}