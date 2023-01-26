import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx"
import { WebSocketServer } from "../http/websocketserver.js";
const { build, builder } = Gjsx;
Gjsx.installGlobals()
let wss = new WebSocketServer(parseInt(env.PEER_SOCKET_PORT))
export const SocketActionButton =
  <interface>
    <object class="GtkButton" id="button">
      <property name="label">Connect to Socket Signal...</property>
      <property name="halign">center</property>
      <style>
        <class name="suggested-action" />
      </style>
    </object>
  </interface>

export const SocketLabel = (
  <interface>
  <object class="GtkLabel" id="socketLabel">
    <property name="visible">true</property>
    <property name="wrap">true</property>
    <property name="justify">center</property>
  </object>
  </interface>
)
export const BoxContainer = GObject.registerClass(
  { GTypeName: "BoxContainer" },
  class BoxContainer extends Gtk.Box {
    constructor(props: Gtk.Box_ConstructProps) {

      super(props);
      this.orientation = Gtk.Orientation.VERTICAL;
      this.spacing = 8;
      const [button] = build<Gtk.Button>("button", builder(SocketActionButton))
      const [label] = build<Gtk.Label>("socketLabel", builder(SocketLabel))
      wss.startListening()
      wss._onWsConnection = (ws, msg, path) => {
        log('Connected to WebsocketServer')
        wss.sendMessage({ action: "onActivateInBox", value: { Donald: "RumsFeld" } })
      }
      wss.passMsgData = (action, value) => {
        button.set_label(action)
        log(`${[value, action]}`)
        label.set_markup(value)
      }
      button.connect('clicked', function(_button){
        print("clicked Button")
        wss.sendMessage(JSON.stringify({ action: "onClicked", value:"KIBOSH BISOSH"}))
      })
      this.append(label)
      this.append(button)
    }

  }
);
