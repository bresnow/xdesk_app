import fetch from "./std/fetch.js";
import Gio from 'gi://Gio';
import GLib from "gi://GLib";
import Gtk from "gi://Gtk?version=4.0";


/**
 * GLOBAL IMPORTERS FOR MODUOLE BUNDLING
 * @description To make Gtk builds like web development I wrote these global imports for the module compiler/bundler
 */
Gtk.init()

const __dirname = GLib.get_current_dir();
// Environment variables reduced into an cinstant global object
let arr = GLib.get_environ()
let env: Record<string, string | undefined> = arr.reduce((acc,curr)=>{
    let [key, value]= curr.split("=")
return {...acc,[key]:value };
},{})
export function installGlobals() {
    return Object.entries({ env, __dirname, fetch  }).forEach(([key, value]) => {
        if (!globalThis[key]) globalThis[key] = value;
    });
}


