import { promiseTask } from "../index.js";
import Soup from "gi://Soup?version=3.0";
import GLib from "gi://GLib";



const text_decoder = new TextDecoder();
const text_encoder = new TextEncoder();

export default class WebSocket {
    eventListeners: WeakMap<object, any>;
    _connection: any;
    readyState: number;
    url: string;
    _uri: GLib.Uri;
    onopen: any;
    onmessage: any;
    onclose: any;
    onerror: any;
    constructor(url:string, protocols = []) {
        this.eventListeners = new WeakMap();
        this._connection = null;
        this.readyState = 0;

        const uri = GLib.Uri.parse(url, GLib.UriFlags.NONE);
        this.url = uri.to_string();
        this._uri = uri;

        if (typeof protocols === "string") protocols = [protocols];

        this._connect(protocols)
        .then(()=>log("WebSocket connected"))
        .catch((err)=> log(err));
    }

    get protocol() {
        return this._connection?.get_protocol() || "";
    }

    async _connect(protocols) {
        const session = new Soup.Session();
        const message = new Soup.Message({
            method: "GET",
            uri: this._uri,
        });

        let connection;

        try {
            connection = await promiseTask(
                session,
                "websocket_connect_async",
                "websocket_connect_finish",
                message,
                "origin",
                protocols,
                null,
                null,
            );
        } catch (err) {
            this._onerror(err);
            return;
        }

        this._onconnection(connection);
    }

    _onconnection(connection) {
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
                const data = text_decoder.decode(message.toArray());
                this._onmessage({ data });
            } else {
                this._onmessage({ data: message });
            }
        });
    }

    send(data) {
        if (typeof data === "string") {
            this._connection.send_message(
                Soup.WebsocketDataType.TEXT,
                new GLib.Bytes(text_encoder.encode(data)),
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
        if (typeof this.onopen === "function") this.onopen();

        this.emit("open");
    }
    emit(arg0: string) {
        throw new Error(arg0 + " Method not implemented.");
    }

    _onmessage(message: any) {
        if (typeof this.onmessage === "function") this.onmessage(message);

        this.emit("message");
    }

    _onclose() {
        this.readyState = 3;
        if (typeof this.onclose === "function") this.onclose();

        this.emit("close");
    }

    _onerror(error) {
        if (typeof this.onerror === "function") this.onerror(error);

        this.emit("error");
    }

    addEventListener(name, fn) {
        const id = this.connect(name, (self, ...args) => {
            fn(...args);
        });
        this.eventListeners.set(fn, id);
    }
    connect(name: any, arg1: (self: any, ...args: any[]) => void) {
        throw new Error("Method not implemented.");
    }

    removeEventListener(name, fn) {
        const id = this.eventListeners.get(fn);
        this.disconnect(id);
        this.eventListeners.delete(fn);
    }
    disconnect(id: any) {
        throw new Error("Method not implemented.");
    }
}