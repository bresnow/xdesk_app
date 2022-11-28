import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Webkit from "gi://WebKit2?version=5.0";
import Gio from "gi://Gio";
import util from "../../lib/gjsx/utils/index.js";
import { __dirname } from "../main.js";
const css_prov = util.CssProvider();
export const ProxiedBroadwayWebView = GObject.registerClass(
  { GTypeName: "ProxiedBroadwayWebView" },
  class extends Gtk.Box {
    _setAttr() {
      this.orientation = Gtk.Orientation.VERTICAL;
      this.valign = Gtk.Align.BASELINE;
      this.vexpand = true;
      this.homogeneous = true;
      this.margin_start = 18;
      this.spacing = 10;
    }
    _init() {
      super._init();
      this._setAttr();
      let webView, scroll, settings, button, box2, label, css1, buttonLabel;
      try {
        webView = new Webkit.WebView();
        webView.load_uri("http://0.0.0.0:8086");
        let vid = new Gtk.Video({
          file: Gio.File.new_for_path(
            __dirname + "/assets/video/lonelyshade.mp4"
          ),
        });
        scroll = new Gtk.ScrolledWindow({ child: webView });
        box2 = new Gtk.Box({
          vexpand: true,
          spacing: 10,
          orientation: Gtk.Orientation.VERTICAL,
        });
        this.append(scroll);
      } catch (e) {
        logError(e);
      }
    }
  }
);
