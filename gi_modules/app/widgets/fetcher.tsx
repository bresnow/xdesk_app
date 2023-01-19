import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx";
import { WebViewer } from "./webviewer.js";
const { encode } = Gjsx;
const HORIZONTAL_BOX = (
  <interface>
    <object class="GtkBox">
      <property name="orientation">horizontal</property>
      <property name="spacing">4</property>
    </object>
  </interface>)

const VERTICAL_BOX = (
  <interface>
    <object class="GtkBox">
      <property name="orientation">vertical</property>
      <property name="spacing">4</property>
    </object>
  </interface>
);
const FetchWidget = GObject.registerClass(
  {},
  class extends Gtk.Widget {
    constructor(parameters: Gtk.Widget_ConstructProps) {
      super(parameters);
    }
  }
);
