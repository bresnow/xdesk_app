import Gjsx from "gi://Gjsx";
import Soup from "gi://Soup?version=3.0";
import GObject from "gi://GObject";
import broadwayScript from "../assets/views/js/broadway.mjs" assert { type: "string" };
//@ts-expect-error
import indexHtml from "../assets/views/index.html" assert { type: "string" };
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
        50000,
        8085
      ),
    },
  },
  class extends Soup.Server {
    port: number;
    constructor(config: Soup.Server_ConstructProps & { port?: number }) {
      super(config);
      this.port = config.port ?? get_display_port();
    }
    get displayPort(): number {
      return this.port;
    }
    nextPort() {
      this.port = this.port++;
    }
    broadwayLaunch() {
      const _init = launch(["nohup", "gtk4-broadwayd", `--port=${this.port}`]);
      if (_init.get_exit_status()!== undefined) {
          this.nextPort();
          print("Getting Next Port"+ this.port)
        this.broadwayLaunch();
      }
    }
    use(path: string, callback: Soup.ServerCallback) {
      this.add_handler(path, callback);
    }
    serve(callback?: () => void) {
      callback();
    }
  }
);
const bw = new BroadwayProxy({})
bw.serve(()=>{
    print("Starting" + bw.port)
})
// Mainloop
function get_display_port() {
  return parseInt(env.BROADWAY_DISPLAY.replace(":", "")) + 8080;
}
