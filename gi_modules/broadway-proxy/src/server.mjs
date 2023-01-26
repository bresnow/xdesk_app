import express from "express";
import url from "url";
import Gun from "gun";
import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";
import fs from "fs-extra";
import hp from "http-proxy";
import process from "process";
const app = express();
const BROADWAY_DISPLAY = process.env.BROADWAY_DISPLAY ?? ":5";
const GUN_PORT = parseInt(process.env.RELAY_PORT);
const RADATA_DIR = process.env.AMNION_RADATA_PATH ?? "/radata/amnion";
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN,
  peer = `https://${FRONTEND_DOMAIN}/gun`;
const BROADWAY_PORT = broadwayPort(),
  PROXY_PORT = broadwayPort() + 1,
  SOCKET_INTERNAL = PROXY_PORT + 2;
const DEBUG = process.env.DEBUG === "debug";

if (!fs.existsSync(RADATA_DIR)) {
  fs.mkdirpSync(RADATA_DIR);
}
let app0 = express();
var gunserve = createServer(app0);
// app0.use(express.static('./views'))
gunserve.on("upgrade", function (request, socket, head) {
  hp.createProxyServer({
    target: `http://0.0.0.0:${SOCKET_INTERNAL}`,
    ws: true,
  }).ws(request, socket, head);
  console.log("proxying gunserve upgrade request", `0.0.0.0:${GUN_PORT}`);
});
gunserve.listen(GUN_PORT);
const gun = Gun({ peers: [peer], radisk: true });
let socketNode = gun.get("test_WEBSOCKET").get("socket");
socketNode.on((data) => {
  console.log("SOCKETNODE SUBSCRIPTION", data);
});
let amnionSock = new WebSocket(`ws://0.0.0.0:${SOCKET_INTERNAL}/amnion`);
amnionSock.onopen = (ev) => {
  amnionSock.send(JSON.stringify({ action: "test", value: "test_WEBSOCKET" }));
};
amnionSock.onmessage = ({ data }) => {
  if (data) {
    console.log({ data });
  }
  socketNode.put(JSON.parse(JSON.stringify(data)));
};

const server = createServer(app);
server.on("upgrade", function (request, socket, head) {
  hp.createProxyServer({
    target: `http://0.0.0.0:${BROADWAY_PORT}`,
    ws: true,
  }).ws(request, socket, head);
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
