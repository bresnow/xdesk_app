import Gjsx from "gi://Gjsx";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { buildaBitch } from "./widgets/demo.js";
import { BoxContainer } from "./widgets/box_container.js";
//@ts-expect-error
import paidlogo from "../assets/images/paid_logo.png";
//@ts-expect-error
import cnxtLogo from "../assets/images/cnxt.png";
//@ts-expect-error
import bdsLogo from "../assets/images/bds-mark.png";
import { WebViewer } from "./widgets/webviewer.js";
import GObject from "gi://GObject";
import { StackSwitch } from "./widgets/stackswitch.js";
const Pango = imports.gi.Pango;
const { styleObjectToCssData } = Gjsx;
export const TextView = GObject.registerClass(
  {},
  class extends Gtk.Box {
    constructor(props: Gtk.Box_ConstructProps) {
      super(props);
      this.orientation = Gtk.Orientation.VERTICAL;
      this.build();
    }
    tools(textbuffer: Gtk.TextBuffer) {
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
        const images: string[] = JSON.parse(markup).images;
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
export function MainWindow({ app }: { app: Gtk.Application }) {
  const panel = [
    {
      name: "Bresnow Logo",
      icon_path: bdsLogo,
      clickHandler(_button: Gtk.Button): void {
        genericClick(_button.get_parent(), "https://drawio.fltngmmth.com");
      },
    },
    {
      name: "CNXT",
      icon_path: cnxtLogo,
      clickHandler(_button: Gtk.Button) {
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
  return (
    <AppWindow application={app}>
      <BoxContainer
        style={{
          padding: "15px",
          background: "rgba(0, 0, 50, 0.8)",
          color: "#fff",
        }}
      >
        <Gtk.Separator
          style={{ margin: "30px" }}
          orientation={Gtk.Orientation.VERTICAL}
        />
        <HeadLayout services={panel} />
        <StackSwitch />
        {/* <TextView>
          <HeadLayout services={panel} />
        </TextView> */}
      </BoxContainer>
    </AppWindow>
  );
}

function paidClick(_button: Gtk.Button) {
  const parent = _button.get_parent();
  genericClick(parent, "http://front_dev:3333");
}

function genericClick(parent: Gtk.Widget, url: string) {
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
