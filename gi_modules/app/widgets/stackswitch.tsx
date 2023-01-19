import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx";
import { BoxContainer } from "./box_container.js";
import { TextView } from "../mainwindow.js";

const { build, useBuilder, builder } = Gjsx;
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
            <object class="GtkProgressBar" id="stack-progress"></object>
          </property>
        </object>
      </child>
    </object>
  </interface>
);

var __json = JSON.stringify;
export const StackSwitch = GObject.registerClass(
  class extends Gtk.Box {
    _init(): void {
      super._init();
      const { Align, Orientation, EntryIconPosition } = Gtk;
      this.valign = Align.FILL;
      this.orientation = Orientation.VERTICAL;

      let stack_ = builder(stack_resource);
      let grid_ = builder(grid_resource);
      let [stack, getStack] = build<Gtk.StackSwitcher>("stack_switch", stack_);
      let [grid] = build<Gtk.Grid>("grid_root", grid_);
      grid.attach(new TextView({}), 1, 1, 1, 1);
      this.gridSettings(grid);
      this.append(grid);
    }
    gridSettings(grid: Gtk.Grid) {
      grid.set_column_homogeneous(true);
      grid.set_row_homogeneous(true);
      grid.set_vexpand(true);
      grid.set_hexpand(true);
    }
  }
);
