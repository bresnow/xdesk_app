import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "../../gjsx/index.js";
const { encode } = Gjsx;
const FetchWidget = GObject.registerClass(
  {},
  class extends Gtk.Widget {
    constructor(parameters) {
      super(parameters);
    }
  }
);
