import Gjsx from "gi://Gjsx";
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk";
import GLib from "gi://GLib";
import Soup from "gi://Soup?version=3.0"
import { MainWindow } from "./mainwindow.js";

import { WebSocketServer, WebSocket } from './http/websocketserver.js';
import GObject from 'gi://GObject';

Gjsx.installGlobals()
const { encode } = Gjsx
let description = `CNXT is built using the FLTNGMMTH mobile operating system.`
// Global stylesheet
const display = Gdk.Display.get_default()
let dname = display.get_name();
 var DEBUG = env.DEBUG,
  argv = ARGV;
const app = new Gtk.Application();
app.connect("activate", () => {
  if (
    dname === "Broadway" ||
    dname.toLowerCase() === env["GDK_BACKEND"]
    ) {

    Gjsx.render(<MainWindow app={app} />);
    log("Broadway Proxy Initiated For Application");
  } else {
    throw new Error(`The ${dname} display backend is not supported`);
  }
});


// Mainloop
app.run([]);
