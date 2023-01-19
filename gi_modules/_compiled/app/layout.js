import Gjsx from "../gjsx/index.js";
import Gtk from "gi://Gtk?version=4.0";
const style = {
  box: {
    padding: "15px",
    background: "rgba(0, 0, 50, 0.8)",
    color: "#fff",
    borderRadius: "15px",
  },
};
export function HeadLayout({ services }) {
  return /* @__PURE__ */ Gjsx.createWidget(
    Gtk.Box,
    { spacing: 18, style: style.box, orientation: Gtk.Orientation.HORIZONTAL },
    services.map(({ name, icon_path, clickHandler }, i) => {
      return /* @__PURE__ */ Gjsx.createWidget(
        Gtk.Button,
        {
          onClicked: clickHandler,
          halign: Gtk.Align.CENTER,
          label: name,
          css_name: "buttonbottom",
        },
        /* @__PURE__ */ Gjsx.createWidget(Gtk.Image, {
          file: icon_path,
          style: { marginLeft: "5px" },
          pixel_size: 65,
        })
      );
    })
  );
}
