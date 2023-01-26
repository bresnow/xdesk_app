import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "../../gjsx/index.js";
import { WebSocketServer } from "../http/websocketserver.js";
const { build, builder } = Gjsx;
Gjsx.installGlobals();
let wss = new WebSocketServer(parseInt(env.PEER_SOCKET_PORT));
export const SocketActionButton = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkButton", id: "button" },
    /* @__PURE__ */ Gjsx.createWidget(
      "property",
      { name: "label" },
      "Connect to Socket Signal..."
    ),
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "halign" }, "center"),
    /* @__PURE__ */ Gjsx.createWidget(
      "style",
      null,
      /* @__PURE__ */ Gjsx.createWidget("class", { name: "suggested-action" })
    )
  )
);
export const SocketLabel = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkLabel", id: "socketLabel" },
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "visible" }, "true"),
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "wrap" }, "true"),
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "justify" }, "center")
  )
);
export const BoxContainer = GObject.registerClass(
  { GTypeName: "BoxContainer" },
  class BoxContainer2 extends Gtk.Box {
    constructor(props) {
      super(props);
      this.orientation = Gtk.Orientation.VERTICAL;
      this.spacing = 8;
      const [button] = build("button", builder(SocketActionButton));
      const [label] = build("socketLabel", builder(SocketLabel));
      wss.startListening();
      wss._onWsConnection = (ws, msg, path) => {
        log("Connected to WebsocketServer");
        wss.sendMessage({
          action: "onActivateInBox",
          value: { Donald: "RumsFeld" },
        });
      };
      wss.passMsgData = (action, value) => {
        button.set_label(action);
        log(`${[value, action]}`);
        label.set_markup(value);
      };
      button.connect("clicked", function (_button) {
        print("clicked Button");
        wss.sendMessage(
          JSON.stringify({ action: "onClicked", value: "KIBOSH BISOSH" })
        );
      });
      this.append(label);
      this.append(button);
    }
  }
);
