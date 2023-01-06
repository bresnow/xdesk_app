import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";
import fs from "fs-extra"
import Gun from "gun";
import url from "url"
import hp from "http-proxy";
import process from "process";
const app = express();
const BROADWAY_DISPLAY = process.env.BROADWAY_DISPLAY ?? ":5";
const RADATA_DIR = process.env.AMNION_RADATA_PATH ?? "/radata/amnion";
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN ?? "0.0.0.0:3333", peer = `https://${FRONTEND_DOMAIN}/gun`;
const BROADWAY_PORT = broadwayPort(), PROXY_PORT = broadwayPort() + 1,
  SOCKET_INTERNAL = PROXY_PORT + 2;
const DEBUG = (process.env.DEBUG === "debug");



const wss = new WebSocketServer({
  server: app.listen(SOCKET_INTERNAL, () => {
    console.log("WebSocket Internal DB listening on port", SOCKET_INTERNAL);
  }),
});
wss.on("connection", function (server, socket, request) {
  console.log("WEBSOCKET SERVER CONNECTION");

  wss.emit("message", {
    test: "connection",
    message: { continue: true, type: "test" }
  })
});
wss.on('message', function (msg) {
  console.log("WEBSOCKET MESSAGE", JSON.stringify(msg, null, 2));
})


// TODO: Config Data Store Directory
if (!fs.existsSync(RADATA_DIR)) {
  fs.mkdirpSync(RADATA_DIR);
}
const gun = Gun({ peers: [peer], web: wss, file: RADATA_DIR });





const server = createServer(app);

server.on("upgrade", function (request, socket, head) {
  hp.createProxyServer({ target: `http://0.0.0.0:${BROADWAY_PORT}`, ws: true }).ws(request, socket, head)
  console.log("proxying upgrade request", `0.0.0.0:${PROXY_PORT}`);
});

app.use("/", express.static("./views"));
server.listen(PROXY_PORT, () => {
  console.log(
    "Broadway Server has been proxied and is listening on port",
    PROXY_PORT
  );
});
function broadwayPort() {
  return parseInt(BROADWAY_DISPLAY.replace(":", "")) + 8080;
}
