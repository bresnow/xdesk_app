import Gjsx from "gi://Gjsx";
import Gtk from "gi://Gtk?version=4.0";
import { HeadLayout } from "./layout.js";
import { AppWindow } from "./widgets/appwindow.js";
import { Demo } from "./widgets/demo.js";
import { StackSwitch } from './widgets/stackswitch.js';
import { BoxContainer } from './widgets/box_container.js';
//@ts-expect-error
import micIcon from "../assets/images/icons/blue/mic.svg";
//@ts-expect-error
import listAdd from "../assets/images/icons/blue/list_add.svg";
//@ts-expect-error
import checkIcon from "../assets/images/icons/blue/check.svg";
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
      icon_path: checkIcon,
      clickHandler(_button: Gtk.Button) {
        log("Clicked1")
      }
    },
    {
      name: "Gtk4 Tour",
      icon_path: listAdd,
      clickHandler(_button: Gtk.Button) {

        log("Clicked2")
      }
    },
    {
      name: "Demo App",
      icon_path: micIcon,
      clickHandler(_button: Gtk.Button) {

        log("Clicked3")
      }
    },
  ];
  return (
    <AppWindow application={app}>
      <BoxContainer style={{ padding: "15px", background: "rgba(0, 0, 50, 0.8)", color: "#fff" }}>
        <Gtk.Label style={{ fontSize: "30px", fontWeight: "bold" }} label="X://ProgramaticAssets" />
        <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
        <Gtk.Label style={{ fontSize: "30px", fontWeight: "bold" }} label="Title Of Contract" />
        <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
        <HeadLayout services={panel} />
      </BoxContainer>
    </AppWindow>
  );
}
