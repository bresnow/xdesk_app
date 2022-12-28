import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "../../gjsx/index.js";
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
          /* @__PURE__ */ Gjsx.createWidget(
            "object",
            { class: "GtkLabel", id: "stack-label" },
            /* @__PURE__ */ Gjsx.createWidget(
              "property",
              { name: "label" },
              "Summ Summ Summ"
            )
          )
        )
      )
    ),
    /* @__PURE__ */ Gjsx.createWidget(
      "child",
      null,
      /* @__PURE__ */ Gjsx.createWidget(
        "object",
        { class: "GtkStackPage", id: "page2" },
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "name" },
          "files"
        ),
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "title" },
          "Files"
        ),
        /* @__PURE__ */ Gjsx.createWidget(
          "property",
          { name: "child" },
          /* @__PURE__ */ Gjsx.createWidget(
            "object",
            { class: "GtkLabel" },
            /* @__PURE__ */ Gjsx.createWidget(
              "property",
              { name: "label" },
              "We will display files here"
            )
          )
        )
      )
    )
  )
);
var __json = JSON.stringify;
export const StackSwitch = GObject.registerClass(
  {
    Signals: {
      fetch: {
        handler: "fetchHandler",
      },
    },
  },
  class extends Gtk.Box {
    _init() {
      super._init();
      const { Align, Orientation, EntryIconPosition } = Gtk;
      this.valign = Align.FILL;
      this.orientation = Orientation.VERTICAL;
      let [stack, getStackObject] = useBuilder(stack_resource, "stack-switch");
      let [grid, getGridObject] = build("grid_root", builder(grid_resource));
      let label = getGridObject("description"),
        label2 = getStackObject("stack-label");
      this.gridSettings(grid);
      let entry = getGridObject("tag_search");
      grid.attach(stack, 1, 1, 1, 1);
      this.append(grid);
      this.connect("fetch", async (_box) => {
        var res, _hres;
        log(__json({ env }));
        try {
          const response = await fetch(
            `https://api.c99.nl/textparser?key=${env.C99_API_KEY}&url=http://digitalnativestudios.com/textmeshpro/docs/rich-text/line-indent.png`
          );
          res = await response.text();
          const horizonres = await fetch(
            "https://horizon-testnet.cnxt.dev/fee_stats"
          );
          _hres = await horizonres.json();
          log(__json(_hres));
          label.set_label(JSON.stringify(_hres));
          label2.set_label(__json(_hres));
        } catch (err) {
          logError(err);
        }
      });
      this.fetchHandler();
      this.append(label);
    }
    fetchHandler() {
      this.emit("fetch");
    }
    gridSettings(grid) {
      grid.set_column_homogeneous(true);
      grid.set_row_homogeneous(true);
      grid.set_vexpand(true);
      grid.set_hexpand(true);
    }
  }
);
