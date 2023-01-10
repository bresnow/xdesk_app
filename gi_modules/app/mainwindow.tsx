import Gjsx from "gi://Gjsx";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { buildaBitch, Demo } from "./widgets/demo.js";
import { StackSwitch } from "./widgets/stackswitch.js";
import { BoxContainer } from "./widgets/box_container.js";
//@ts-expect-error
import paidlogo from "../assets/images/paid_logo.png";
//@ts-expect-error
import cnxtLogo from "../assets/images/cnxt.png"
//@ts-expect-error
import bdsLogo from "../assets/images/bds-mark.png";
import { WebViewer } from "./widgets/webviewer.js";
const { build, builder } = Gjsx;

export function MainWindow({
  app,
  reference,
}: {
  app: Gtk.Application;
  reference: any;
}) {
  const panel = [
    {
      name: "Gtk4-Demo",
      icon_path: bdsLogo,
      clickHandler(_button: Gtk.Button) {
        let window: Gtk.Window, builder: Gtk.Builder, app = new Gtk.Application(), webmsg = new WebViewer();
        try {
          window = new Gtk.Window({ application: app }), builder = Gtk.Builder.new_from_string(buildaBitch, buildaBitch.length)
          app.connect("activate", () => {
            window.set_child(webmsg)
            window.show()
            window.maximize()
            window.present()
          })
          app.run([])
        } catch (error) {
          _button.label = error.message
        }
      },
    },
    {
      name: "Gtk4 Tour",
      icon_path: cnxtLogo,
      clickHandler(_button: Gtk.Button) {
        let window: Gtk.Window, builder: Gtk.Builder, app = new Gtk.Application(), webmsg = new WebViewer({url:"http://front_dev:3333"});
        try {
          window = new Gtk.Window({ application: app }), builder = Gtk.Builder.new_from_string(buildaBitch, buildaBitch.length)
          app.connect("activate", () => {
            window.set_child(webmsg)
            window.show()
            window.maximize()
            window.present()
          })
          app.run([])
        } catch (error) {
          _button.label = error.message
        }
      },
    },
    {
      name: "Demo App",
      icon_path: paidlogo,
      clickHandler(_button: Gtk.Button) {
        let window: Gtk.Window, builder: Gtk.Builder, app = new Gtk.Application(), webmsg = new WebViewer();
        try {
          window = new Gtk.Window({ application: app }), builder = Gtk.Builder.new_from_string(buildaBitch, buildaBitch.length)
          app.connect("activate", () => {
            window.set_child(webmsg)
            window.show()
            window.maximize()
            window.present()
          })
          app.run([])
        } catch (error) {
          _button.label = error.message
        }
      },
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
        <Gtk.Label
          style={{ fontSize: "30px", fontWeight: "bold" }}
          label="#SPIDERMAN"
        />
        <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
        <Gtk.Label
          style={{ fontSize: "30px", fontWeight: "bold" }}
          label="GOD"
        />
        <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
        <HeadLayout services={panel} />
      </BoxContainer>
    </AppWindow>
  );
}
