import Gjsx from "../gjsx/index.js";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { BoxContainer } from "./widgets/box_container.js";
const micIcon = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/icons/blue/mic.svg")
  .get_uri()
  .replace("file://", "");
const listAdd = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/icons/blue/list_add.svg")
  .get_uri()
  .replace("file://", "");
const checkIcon = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/icons/blue/check.svg")
  .get_uri()
  .replace("file://", "");
const { build, builder } = Gjsx;
export function MainWindow({ app, reference }) {
  const panel = [
    {
      name: "Gtk4-Demo",
      icon_path: checkIcon,
      clickHandler(_button) {
        _button.set_margin_bottom(3);
        _button.set_child(
          new Gtk.Image({ file: "/gjsx/gi_modules/assets/images/AppIcon.svg" })
        );
      },
    },
    {
      name: "Gtk4 Tour",
      icon_path: listAdd,
      clickHandler(_button) {
        log("Clicked2");
      },
    },
    {
      name: "Demo App",
      icon_path: micIcon,
      clickHandler(_button) {
        log("Clicked3");
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
        label: "X://ProgramaticAssets",
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Separator, {
        orientation: Gtk.Orientation.VERTICAL,
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Label, {
        style: { fontSize: "30px", fontWeight: "bold" },
        label: "Title Of Contract",
      }),
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Separator, {
        orientation: Gtk.Orientation.VERTICAL,
      }),
      /* @__PURE__ */ Gjsx.createWidget(HeadLayout, { services: panel })
    )
  );
}
