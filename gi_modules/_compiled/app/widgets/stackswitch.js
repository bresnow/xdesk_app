import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "../../gjsx/index.js";
import { TextView } from "../mainwindow.js";
const { build, useBuilder, builder } = Gjsx;
const grid_resource = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkGrid", id: "grid_root" },
    /* @__PURE__ */ Gjsx.createWidget(
      "child",
      null,
      /* @__PURE__ */ Gjsx.createWidget(
        "object",
        { class: "GtkLabel", id: "description" },
        /* @__PURE__ */ Gjsx.createWidget(
          "layout",
          null,
          /* @__PURE__ */ Gjsx.createWidget(
            "property",
            { name: "column" },
            "0"
          ),
          /* @__PURE__ */ Gjsx.createWidget("property", { name: "row" }, "0"),
          /* @__PURE__ */ Gjsx.createWidget(
            "property",
            { name: "row-span" },
            "1"
          ),
          /* @__PURE__ */ Gjsx.createWidget(
            "property",
            { name: "column-span" },
            "1"
          )
        )
      )
    ),
    /* @__PURE__ */ Gjsx.createWidget(
      "child",
      null,
      /* @__PURE__ */ Gjsx.createWidget(
        "object",
        { class: "GtkBox", id: "entry_box" },
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "layout-manager" },
          /* @__PURE__ */ Gjsx.createWidget(
            "object",
            { class: "GtkBoxLayout" },
            /* @__PURE__ */ Gjsx.createWidget(
              "property",
              { name: "orientation" },
              "vertical"
            )
          )
        ),
        /* @__PURE__ */ Gjsx.createWidget(
          "child",
          null,
          /* @__PURE__ */ Gjsx.createWidget(
            "object",
            { class: "GtkEntry", id: "vs_entry" },
            /* @__PURE__ */ Gjsx.createWidget(
              "property",
              { name: "valign" },
              "center"
            ),
            /* @__PURE__ */ Gjsx.createWidget(
              "style",
              null,
              /* @__PURE__ */ Gjsx.createWidget("class", { name: "big" })
            )
          )
        )
      )
    )
  )
);
const stack_resource = /* @__PURE__ */ Gjsx.createWidget(
  "interface",
  null,
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkStackSwitcher", id: "stack_switch" },
    /* @__PURE__ */ Gjsx.createWidget(
      "property",
      { name: "stack" },
      "viewStack"
    )
  ),
  /* @__PURE__ */ Gjsx.createWidget(
    "object",
    { class: "GtkStack", id: "viewStack" },
    /* @__PURE__ */ Gjsx.createWidget(
      "child",
      null,
      /* @__PURE__ */ Gjsx.createWidget(
        "object",
        { class: "GtkStackPage", id: "page1" },
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "name" },
          "welcome"
        ),
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "title" },
          "Welcome"
        ),
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "child" },
          /* @__PURE__ */ Gjsx.createWidget("object", {
            class: "GtkProgressBar",
            id: "stack-progress",
          })
        )
      )
    )
  )
);
var __json = JSON.stringify;
export const StackSwitch = GObject.registerClass(
  class extends Gtk.Box {
    _init() {
      super._init();
      const { Align, Orientation, EntryIconPosition } = Gtk;
      this.valign = Align.FILL;
      this.orientation = Orientation.VERTICAL;
      let stack_ = builder(stack_resource);
      let grid_ = builder(grid_resource);
      let [stack, getStack] = build("stack_switch", stack_);
      let [grid] = build("grid_root", grid_);
      grid.attach(new TextView({}), 1, 1, 1, 1);
      this.gridSettings(grid);
      this.append(grid);
    }
    gridSettings(grid) {
      grid.set_column_homogeneous(true);
      grid.set_row_homogeneous(true);
      grid.set_vexpand(true);
      grid.set_hexpand(true);
    }
  }
);
