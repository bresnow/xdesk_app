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
const gun_serve = createServer((request) =>{
let url = new URL(request.url);
if(url.pathname === "gun"){
  console.log(JSON.stringify(url));
}
})
const gun = Gun({ peers: [peer], web: gun_serve.listen(SOCKET_INTERNAL, function(){
  console.log(`Gun Peer Relay Server Listening On ${SOCKET_INTERNAL}`)
} ), file: RADATA_DIR });

gun.get('test_WEBSOCKET_/').once(data => {

})
let ws2 = new WebSocket('ws://0.0.0.0:8089/amnion')
ws2.onopen=(ev)=> {
  console.log("CLIENTBUSSSIN")
  ws2.send(JSON.stringify({action:"test", value: "test_WEBSOCKET_/"}))
}
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