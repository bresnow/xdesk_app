import express,{ Router } from "express";
import { createRequire } from "module";
import { dirname, resolve } from "path";
let require = createRequire(import.meta.url);
let DIRECTORY = dirname(require.resolve("../package.json"));
const routes = new Router();
// serve static content
var app = express();
routes.get("/check", (req, res) => res.json({ ok: true }));

export default routes;
