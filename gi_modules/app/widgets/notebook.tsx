import GObject from "gi://GObject";
import Gtk from "gi://Gtk?version=4.0";
import {TextView} from "../mainwindow.js";
const NoteBook = GObject.registerClass(
  {
    GTypeName: "Notebook",
  },
  class extends Gtk.Box {
    constructor(args: Gtk.Box_ConstructProps) {
      super(args);
      this.set_vexpand(true)
      this.set_hexpand(true)
      this.build();
    }
    build() {
      let notebook = new Gtk.Notebook();
      this.append(notebook);

      let page = new Gtk.Box();
      page.append(new TextView({}));
      let nbPage = new Gtk.NotebookPage()
      notebook.append_page(page, new Gtk.Label({ label: "Plain Title" }));

      let page2 = new Gtk.Box();
      page2.append(
        new Gtk.Label({ label: "A page with an image for a Title." })
      );
      notebook.append_page(page, Gtk.Image.new_from_icon_name("help-about"));
    }
  }
);
export { NoteBook};
