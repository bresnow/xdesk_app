import Gjsx from "../gjsx/index.js";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { BoxContainer } from "./widgets/box_container.js";
const paidlogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/paid_logo.png")
  .get_uri()
  .replace("file://", "");
const cnxtLogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/cnxt.png")
  .get_uri()
  .replace("file://", "");
const bdsLogo = imports.gi.Gio.File.new_for_uri(import.meta.url)
  .get_parent()
  .resolve_relative_path("../assets/images/bds-mark.png")
  .get_uri()
  .replace("file://", "");
import { WebViewer } from "./widgets/webviewer.js";
import GObject from "gi://GObject";
import { StackSwitch } from "./widgets/stackswitch.js";
const Pango = imports.gi.Pango;
const { styleObjectToCssData } = Gjsx;
export const TextView = GObject.registerClass(
  {},
  class extends Gtk.Box {
    constructor(props) {
      super(props);
      this.orientation = Gtk.Orientation.VERTICAL;
      this.build();
    }
    tools(textbuffer) {
      const horiz = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
      const button_bold = new Gtk.Button();
      button_bold.set_icon_name("format-text-bold-symbolic");
      horiz.append(button_bold);
      const button_italic = new Gtk.Button();
      button_italic.set_icon_name("format-text-italic-symbolic");
      horiz.append(button_italic);
      const button_underline = new Gtk.Button();
      button_underline.set_icon_name("format-text-underline-symbolic");
      horiz.append(button_underline);
      horiz.append(new Gtk.Separator());
      const radio_justifyleft = Gtk.Button.new_from_icon_name(
        "format-justify-left-symbolic"
      );
      horiz.append(radio_justifyleft);
      const radio_justifycenter = Gtk.Button.new_from_icon_name(
        "format-justify-center-symbolic"
      );
      horiz.append(radio_justifycenter);
      const radio_justifyright = Gtk.Button.new_from_icon_name(
        "format-justify-right-symbolic"
      );
      horiz.append(radio_justifyright);
      const radio_justifyfill = Gtk.Button.new_from_icon_name(
        "format-justify-fill-symbolic"
      );
      horiz.append(radio_justifyfill);
      radio_justifyleft.connect("clicked", async (_self) => {
        const response = await fetch(
          `https://api.c99.nl/eitheror?key=${env.C99_API_KEY}&json`
        );
        const markup = JSON.stringify(await response.json(), null, 2);
        textbuffer.set_text(markup, markup.length);
      });
      radio_justifycenter.connect("clicked", async (_self) => {
        const response = await fetch(
          `https://api.c99.nl/randomperson?key=${env.C99_API_KEY}&gender=all&json`
        );
        const markup = JSON.stringify(await response.json(), null, 2);
        textbuffer.set_text(markup, markup.length);
      });
      radio_justifyright.connect("clicked", async (_self) => {
        const response = await fetch(
          `https://api.c99.nl/weather?key=${env.C99_API_KEY}&location=Miami&json`
        );
        const markup = JSON.stringify(await response.json(), null, 2);
        textbuffer.set_text(markup, markup.length);
      });
      radio_justifyfill.connect("clicked", async (_self) => {
        const response = await fetch(
          `http://stellar_quickstart_ephemeral:8000/accounts/${env.ISSUER_ID}`
        );
        const markup = JSON.stringify(await response.json(), null, 2);
        textbuffer.set_text(markup, markup.length);
      });
      this.append(horiz);
      this.append(new Gtk.Separator());
      const button_clear = Gtk.Button.new_from_icon_name("edit-clear-symbolic");
      button_clear.connect("clicked", (widget) => {
        const start = textbuffer.get_start_iter();
        const end = textbuffer.get_end_iter();
        textbuffer.remove_all_tags(start, end);
      });
      horiz.append(button_clear);
      this.append(new Gtk.Separator());
    }
    build() {
      const textview = new Gtk.TextView();
      const textbuffer = textview.get_buffer();
      this.tools(textbuffer);
      const scrolledwindow = new Gtk.ScrolledWindow();
      const me = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL });
      scrolledwindow.connect("notify::vexpand", async (_self) => {
        const response = await fetch(
          `https://api.c99.nl/gif?key=${env.C99_API_KEY}&keyword=bean&json`
        );
        const markup = JSON.stringify(await response.json(), null, 2);
        textbuffer.set_text(markup, markup.length);
        const images = JSON.parse(markup).images;
        images.forEach((image) => {
          me.append(new WebViewer({ url: image }));
        });
      });
      scrolledwindow.set_hexpand(true);
      scrolledwindow.set_vexpand(true);
      this.spacing = 5;
      const css = new Gtk.CssProvider();
      const _style = {
        borderRadius: "5px",
        color: "rgba(0, 0, 50, 0.9)",
        padding: "5px",
      };
      css.load_from_data(`* { ${styleObjectToCssData(_style)} }`);
      textview.get_style_context().add_provider(css, 0);
      scrolledwindow.set_child(textview);
      this.append(scrolledwindow);
      this.append(me);
    }
  }
);
export function MainWindow({ app }) {
  const panel = [
    {
      name: "Bresnow Logo",
      icon_path: bdsLogo,
      clickHandler(_button) {
        genericClick(_button.get_parent(), "https://drawio.fltngmmth.com");
      },
    },
    {
      name: "CNXT",
      icon_path: cnxtLogo,
      clickHandler(_button) {
        genericClick(
          _button.get_parent(),
          "http://stellar_quickstart_ephemeral:8000"
        );
      },
    },
    {
      name: "Paid Media",
      icon_path: paidlogo,
      clickHandler: paidClick,
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
      /* @__PURE__ */ Gjsx.createWidget(Gtk.Separator, {
        style: { margin: "30px" },
        orientation: Gtk.Orientation.VERTICAL,
      }),
      /* @__PURE__ */ Gjsx.createWidget(HeadLayout, { services: panel }),
      /* @__PURE__ */ Gjsx.createWidget(StackSwitch, null)
    )
  );
}
function paidClick(_button) {
  const parent = _button.get_parent();
  genericClick(parent, "http://front_dev:3333");
}
function genericClick(parent, url) {
  var box = new Gtk.Box();
  let scroll = new Gtk.ScrolledWindow();
  box.set_orientation(Gtk.Orientation.VERTICAL);
  scroll.set_child(new WebViewer({ url }));
  box.set_hexpand(true);
  box.set_vexpand(true);
  box.append(scroll);
  scroll.show();
  box.set_parent(parent);
}
