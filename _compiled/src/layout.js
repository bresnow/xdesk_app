import Gtk from "gi://Gtk?version=4.0";
import { writeTextFileSync } from "../lib/util.js";
import Gjsx from "../lib/gjsx/index.js";
import { __dirname } from "./main.js";
import Webkit from "gi://WebKit2?version=5.0";
import Util from "../lib/gjsx/utils/index.js";
import Gio from "gi://Gio";
const horizontal = Gtk.Orientation.HORIZONTAL;
const spawn = Util.execCmd;
export function exec(cmd, opt) {
  let [done, stdout, stderr] = spawn(`${cmd}`);
  let decoded = new TextDecoder().decode(stdout);
  log(decoded);
  if (opt?.logfile)
    writeTextFileSync(
      Gio.File.new_for_path(`/var/log/${opt?.logfile}`),
      stdout
    );
}
export function HeadLayout({ services }) {
  let webview = new Webkit.WebView();
  webview.load_uri("http://0.0.0.0:8086");
  let logo = __dirname + "/assets/images/cnxt.png";
  return /* @__PURE__ */ Gjsx.createWidget(
    Gtk.Box,
    {
      spacing: 18,
      style: { padding: "5px" },
      orientation: horizontal,
    },
    /* @__PURE__ */ Gjsx.createWidget(Gtk.Image, {
      file: logo,
      pixel_size: 125,
    }),
    services.map(({ name, executable: execCmd, icon_path, icon_name }, i) => {
      function clickHandler(self) {
        if (self.has_frame) {
          self.set_has_frame(false);
          typeof execCmd === "string"
            ? exec(execCmd, { logfile: "clickhandle" })
            : exec(execCmd.join(" "), { logfile: "clickhandle" });
          try {
            let doc = webview;
            doc.run_javascript(
              `clickmsg(${name}); test(12345678);`,
              null,
              function (self2, res) {
                self2.run_javascript_finish(res);
              }
            );
          } catch (error) {
            logError(error);
          }
        } else {
          self.set_has_frame(false);
        }
      }
      return /* @__PURE__ */ Gjsx.createWidget(
        Gtk.Button,
        {
          css_name: "button",
          onClicked: clickHandler,
          halign: Gtk.Align.CENTER,
          label: name,
        },
        /* @__PURE__ */ Gjsx.createWidget(Gtk.Image, {
          file: __dirname + "/" + icon_path,
          pixel_size: 50,
        })
      );
    })
  );
}
