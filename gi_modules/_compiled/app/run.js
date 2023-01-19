import Gjsx from "../gjsx/index.js";
import Soup from "gi://Soup?version=3.0";
import GObject from "gi://GObject";
const broadwayScript = new TextDecoder().decode(
  imports.gi.Gio.File.new_for_uri(import.meta.url)
    .get_parent()
    .resolve_relative_path("../assets/views/js/broadway.mjs")
    .load_contents(null)[1]
);
const indexHtml = new TextDecoder().decode(
  imports.gi.Gio.File.new_for_uri(import.meta.url)
    .get_parent()
    .resolve_relative_path("../assets/views/index.html")
    .load_contents(null)[1]
);
Gjsx.installGlobals();
const { encode, launch } = Gjsx;
const BroadwayProxy = GObject.registerClass(
  {
    GTypeName: "BroadwayProxyServer",
    Properties: {
      Port: GObject.ParamSpec.int(
        "port",
        "display-port",
        "Broadway Display Port",
        GObject.ParamFlags.READWRITE,
        8081,
        5e4,
        8085
      ),
    },
  },
  class extends Soup.Server {
    port;
    constructor(config) {
      super(config);
      this.port = config.port ?? get_display_port();
    }
    get displayPort() {
      return this.port;
    }
    nextPort() {
      this.port = this.port++;
    }
    broadwayLaunch() {
      const _init = launch(["nohup", "gtk4-broadwayd", `--port=${this.port}`]);
      if (_init.get_exit_status() !== void 0) {
        this.nextPort();
        print("Getting Next Port" + this.port);
        this.broadwayLaunch();
      }
    }
    use(path, callback) {
      this.add_handler(path, callback);
    }
    serve(callback) {
      callback();
    }
  }
);
const bw = new BroadwayProxy({});
bw.serve(() => {
  print("Starting" + bw.port);
});
function get_display_port() {
  return parseInt(env.BROADWAY_DISPLAY.replace(":", "")) + 8080;
}
