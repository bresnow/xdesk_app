import GLib from "gi://GLib";
import * as Ink from "./ink.js";
const DEBUG_ENV = env.DEBUG === "debug";
export class Debugger {
  name;
  print_state;
  json_space;
  name_printer;
  message_printer;
  time_printer;
  high_precision;
  _isEnabled;
  _lastDebug;
  constructor(name, opts) {
    opts = opts && typeof opts === "object" ? opts : {};
    this.name = name && typeof name === "string" ? name : "GJS Logger";
    this.print_state = opts.print_state ? true : false;
    this.json_space = typeof opts.json_space === "number" ? opts.json_space : 2;
    this.name_printer = opts.name_printer || this._getInkPrinter(true);
    this.message_printer = opts.message_printer || this._getDefaultPrinter();
    this.time_printer = opts.time_printer || this._getInkPrinter(false);
    this.high_precision = opts.high_precision || false;
    if (typeof opts.color !== "undefined") this.color = opts.color;
    this._isEnabled = false;
    this._lastDebug = GLib.get_monotonic_time();
    this.enabled =
      typeof opts.enabled !== "undefined" ? opts.enabled : this._enabledAtStart;
  }
  get enabled() {
    return this._isEnabled;
  }
  set enabled(value) {
    if (this._isEnabled === value) return;
    this._isEnabled = value ? true : false;
    if (!this.print_state) return;
    let state = this.enabled ? "en" : "dis";
    this._runDebug(`debug ${state}abled`);
  }
  get color() {
    return this.name_printer.color;
  }
  set color(value) {
    this.name_printer.color = value;
    this.time_printer.color = this.name_printer.color;
  }
  get debug() {
    return (message) => this._debug(message);
  }
  get _enabledAtStart() {
    if (!DEBUG_ENV) return false;
    return true;
  }
  _getInkPrinter(isBold) {
    if (!Ink) return this._getDefaultPrinter();
    let printer = new Ink.Printer({
      color: Ink.colorFromText(this.name),
    });
    if (isBold) printer.font = Ink.Font.BOLD;
    return printer;
  }
  _getDefaultPrinter() {
    return {
      getPainted: function () {
        return Object.values(arguments);
      },
    };
  }
  _debug(message) {
    if (!this.enabled) return;
    this._runDebug(message);
  }
  _runDebug(message) {
    switch (typeof message) {
      case "string":
        break;
      case "object":
        if (
          message !== null &&
          (message.constructor === Object || message.constructor === Array)
        ) {
          message = JSON.stringify(message, null, this.json_space);
          break;
        }
      default:
        message = String(message);
        break;
    }
    let time = GLib.get_monotonic_time() - this._lastDebug;
    if (!this.high_precision) {
      time =
        time < 1e3
          ? "+0ms"
          : time < 1e6
          ? "+" + Math.floor(time / 1e3) + "ms"
          : "+" + Math.floor(time / 1e6) + "s";
    } else {
      time =
        time < 1e3
          ? "+" + time + "\xB5s"
          : time < 1e6
          ? "+" + (time / 1e3).toFixed(3) + "ms"
          : "+" + (time / 1e6).toFixed(3) + "s";
    }
    printerr(
      this.name_printer.getPainted(this.name),
      this.message_printer.getPainted(message),
      this.time_printer.getPainted(time)
    );
    this._lastDebug = GLib.get_monotonic_time();
  }
}
