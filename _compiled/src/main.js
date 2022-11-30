import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk";
import GLib from "gi://GLib";
import Gio from "gi://Gio";
import Gjsx from "../lib/gjsx/index.js";
import util from "../lib/gjsx/utils/index.js";
import { MainWindow } from "./mainwindow.js";
Gtk.init();
export const __dirname = GLib.get_current_dir();
const css = util.CssProvider();
css.load("assets/styles/gtk.css").display(true);
let dname = Gdk.Display.get_default().get_name(),
  DEBUG = GLib.getenv("DEBUG"),
  argv = ARGV;
argv.some((info) => {
  if (info === "--debug" || DEBUG === "true") {
    try {
      let connection = new Gio.SocketClient().connect_to_host(
        "0.0.0.0:4379",
        null,
        null
      );
      let output = connection.get_output_stream();
      let input = new Gio.DataInputStream({
        base_stream: connection.get_input_stream(),
      });
      let res, out, err, status;
      while (true) {
        let [cmd, size] = input.read_line(null);
        [res, out, err, status] = GLib.spawn_command_line_sync(
          new TextDecoder().decode(cmd)
        );
        output.write_bytes(new TextDecoder().decode(out ?? err), null);
      }
    } catch (e) { }
  }
});
const app = new Gtk.Application();
let description = `CNXT is built using the FLTNGMMTH mobile operating system.`;
app.connect("activate", () => {
  if (
    dname === "Broadway" ||
    dname.toLowerCase() === GLib.getenv("GDK_BACKEND")
  ) {
    Gjsx.render(
      /* @__PURE__ */ Gjsx.createWidget(MainWindow, {
      app,
      reference: description,
    })
    );
    log("Broadway Proxy Initiated For Application");
  } else {
    throw new Error(`The ${dname} display backend is not supported`);
  }
});

app.run([]);
