import Gjsx from "../gjsx/index.js";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { buildaBitch } from "./widgets/demo.js";
import { BoxContainer } from "./widgets/box_container.js";
const paidlogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/paid_logo.png")
  .get_uri()
  .replace("file://", "");
const cnxtLogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/cnxt.png")
  .get_uri()
  .replace("file://", "");
const bdsLogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/bds-mark.png")
  .get_uri()
  .replace("file://", "");
import { WebViewer } from "./widgets/webviewer.js";
const { build, builder } = Gjsx;
export function MainWindow({ app, reference }) {
  const panel = [
    {
      name: "Gtk4-Demo",
      icon_path: bdsLogo,
      clickHandler(_button) {
        let window,
          builder2,
          app2 = new Gtk.Application(),
          webmsg = new WebViewer();
        try {
          (window = new Gtk.Window({ application: app2 })),
            (builder2 = Gtk.Builder.new_from_string(
              buildaBitch,
              buildaBitch.length
            ));
          app2.connect("activate", () => {
            window.set_child(webmsg);
            window.show();
            window.maximize();
            window.present();
          });
          app2.run([]);
        } catch (error) {
          _button.label = error.message;
        }
      },
    },
    {
      name: "Gtk4 Tour",
      icon_path: cnxtLogo,
      clickHandler(_button) {
        let window,
          builder2,
          app2 = new Gtk.Application(),
          webmsg = new WebViewer({ url: "http://front_dev:3333" });
        try {
          (window = new Gtk.Window({ application: app2 })),
            (builder2 = Gtk.Builder.new_from_string(
              buildaBitch,
              buildaBitch.length
            ));
          app2.connect("activate", () => {
            window.set_child(webmsg);
            window.show();
            window.maximize();
            window.present();
          });
          app2.run([]);
        } catch (error) {
          _button.label = error.message;
        }
      },
    },
    {
      name: "Demo App",
      icon_path: paidlogo,
      clickHandler(_button) {
        let window,
          builder2,
          app2 = new Gtk.Application(),
          webmsg = new WebViewer();
        try {
          (window = new Gtk.Window({ application: app2 })),
            (builder2 = Gtk.Builder.new_from_string(
              buildaBitch,
              buildaBitch.length
            ));
          app2.connect("activate", () => {
            window.set_child(webmsg);
            window.show();
            window.maximize();
            window.present();
          });
          app2.run([]);
        } catch (error) {
          _button.label = error.message;
        }
      },
    },
  ];
  return /* @__PURE__ */ Gjsx.createWidget(
    AppWindow,
    { application: app },
    /* @__PURE__ */ Gjsx.createWidget(
      BoxContainer,
      {
        style: {
          padding: "15px",
          background: "rgba(0, 0, 50, 0.8)",
          color: "#fff",
        },
      },
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Label, {
        style: { fontSize: "30px", fontWeight: "bold" },
        label: "#SPIDERMAN",
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Separator, {
        orientation: Gtk.Orientation.VERTICAL,
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Label, {
        style: { fontSize: "30px", fontWeight: "bold" },
        label: "GOD",
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Separator, {
        orientation: Gtk.Orientation.VERTICAL,
      }),
      /* @__PURE__ */ Gjsx.createWidget(HeadLayout, { services: panel })
    )
  );
}
