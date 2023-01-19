import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "../../gjsx/index.js";
const { encode } = Gjsx;
const HORIZONTAL_BOX = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkBox" },
    /* @__PURE__ */ Gjsx.createWidget(
      "property",
      { name: "orientation" },
      "horizontal"
    ),
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "spacing" }, "4")
  )
);
const VERTICAL_BOX = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkBox" },
    /* @__PURE__ */ Gjsx.createWidget(
      "property",
      { name: "orientation" },
      "vertical"
    ),
    /* @__PURE__ */ Gjsx.createWidget("property", { name: "spacing" }, "4")
  )
);
const FetchWidget = GObject.registerClass(
  {},
  class extends Gtk.Widget {
    constructor(parameters) {
      super(parameters);
    }
  }
);
