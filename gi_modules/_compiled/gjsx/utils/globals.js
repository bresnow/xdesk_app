import fetch from "./std/fetch.js";
import GLib from "gi://GLib";
import Gtk from "gi://Gtk?version=4.0";
Gtk.init();
const __dirname = GLib.get_current_dir();
let arr = GLib.get_environ();
let env = arr.reduce((acc, curr) => {
  let [key, value] = curr.split("=");
  return { ...acc, [key]: value };
}, {});
export function installGlobals() {
  return Object.entries({ env, __dirname, fetch }).forEach(([key, value]) => {
    if (!globalThis[key]) globalThis[key] = value;
  });
}
