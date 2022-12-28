import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx";
import { BoxContainer } from "./box_container.js";

const { build,useBuilder ,builder } = Gjsx;
const grid_resource = (
  <interface>
    <object class="GtkGrid" id="grid_root">
      <child>
        <object class="GtkLabel" id="description">
          <layout>
            <property name="column">0</property>
            <property name="row">0</property>
            <property name="row-span">1</property>
            <property name="column-span">1</property>
          </layout>
        </object>
      </child>
      <child>
        <object class="GtkBox" id="entry_box">
          <property name="layout-manager">
            <object class="GtkBoxLayout">
              <property name="orientation">vertical</property>
            </object>
          </property>
          <child>
            <object class="GtkEntry" id="vs_entry">
              <property name="valign">center</property>
              <style>
                <class name="big" />
              </style>
            </object>
          </child>
        </object>
      </child>
    </object>
  </interface>
);
const stack_resource = (
  <interface>
    <object class="GtkStackSwitcher" id="stack_switch">
      <property name="stack">viewStack</property>
    </object>
    <object class="GtkStack" id="viewStack">
      <child>
        <object class="GtkStackPage" id="page1">
          <property name="name">welcome</property>
          <property name="title">Welcome</property>
          <property name="child">
            <object class="GtkLabel" id="stack-label">
              <property name="label">Summ Summ Summ</property>
            </object>
          </property>
        </object>
      </child>
      <child>
        <object class="GtkStackPage" id="page2">
          <property name="name">files</property>
          <property name="title">Files</property>
          <property name="child">
            <object class="GtkLabel">
              <property name="label">We will display files here</property>
            </object>
          </property>
        </object>
      </child>
    </object>
  </interface>
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
    _init(): void {
      super._init();
      const { Align, Orientation, EntryIconPosition } = Gtk;
      this.valign = Align.FILL;
      this.orientation = Orientation.VERTICAL;

      let [stack, getStackObject] = useBuilder<Gtk.Stack>(stack_resource, "stack-switch");
      let [grid, getGridObject] = build<Gtk.Grid>(
        "grid_root",
        builder(grid_resource)
      );
      let label = getGridObject<Gtk.Label>("description"),
        label2 = getStackObject<Gtk.Label>("stack-label");
      this.gridSettings(grid);
      let entry = getGridObject<Gtk.Entry>("tag_search");
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
          label.set_label(JSON.stringify(_hres,));
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
    gridSettings(grid: Gtk.Grid) {
      grid.set_column_homogeneous(true);
      grid.set_row_homogeneous(true);
      grid.set_vexpand(true);
      grid.set_hexpand(true);
    }
  }
);
