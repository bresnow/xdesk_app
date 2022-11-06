import Gtk from "gi://Gtk?version=4.0";
import Gjsx from "../lib/gjsx.js";
import { Layout } from "./layout.js";
import { theme } from "../lib/util.js";
import { AppWindow } from "./widgets/appwindow.js";
import { BoxContainer } from "./widgets/box_container.js";
import { WebMessageGrid } from "./widgets/webmsg_grid.js";
Gtk.init();
let argv = ARGV;
theme(argv);
const MainWindow = function ({ app: app2 }) {
  const names = [
    "GnomeJSX",
    "Typescript",
    "Gtk-4.0",
    "Simplest React For Gjs Library",
  ];
  return /* @__PURE__ */ Gjsx.createWidget(
    AppWindow,
    {
      application: app2,
    },
    /* @__PURE__ */ Gjsx.createWidget(
      BoxContainer,
      null,
      /* @__PURE__ */ Gjsx.createWidget(WebMessageGrid, null),
      /* @__PURE__ */ Gjsx.createWidget(Layout, {
        names,
      })
    )
  );
};
const app = new Gtk.Application();
app.connect("activate", () =>
  Gjsx.render(
    /* @__PURE__ */ Gjsx.createWidget(MainWindow, {
      app,
    })
  )
);
app.run([]);
