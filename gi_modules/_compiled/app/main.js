import Gjsx from "../gjsx/index.js";
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk";
import { MainWindow } from "./mainwindow.js";
import { WebSocketServer } from "./http/websocketserver.js";
Gjsx.installGlobals();
const { encode } = Gjsx;
let description = `CNXT is built using the FLTNGMMTH mobile operating system.`;
const display = Gdk.Display.get_default();
let dname = display.get_name();
var DEBUG = env.DEBUG,
  argv = ARGV;
const app = new Gtk.Application();
app.connect("activate", () => {
  if (dname === "Broadway" || dname.toLowerCase() === env["GDK_BACKEND"]) {
    Gjsx.render(/* @__PURE__ */ Gjsx.createWidget(MainWindow, { app }));
    log("Broadway Proxy Initiated For Application");
  } else {
    throw new Error(`The ${dname} display backend is not supported`);
  }
});
let wss = new WebSocketServer(8089);
wss.passMsgData = (type, data) => {
  log(`Received MESSAGE: ${type} ` + JSON.stringify(data, null, 2));
};
wss.startListening();
app.run([]);
