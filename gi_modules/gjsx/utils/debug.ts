import GLib from "gi://GLib";
import * as Ink from "./ink.js"
const DEBUG_ENV = env.DEBUG === 'debug'

export class Debugger {
    name: string;
    print_state: boolean;
    json_space: any;
    name_printer: any;
    message_printer: any;
    time_printer: any;
    high_precision: any;
    _isEnabled: boolean;
    _lastDebug: number;
    constructor(name: string, opts?: Partial<{ print_state: any; json_space: any; name_printer: Ink.Printer | { getPainted: () => any[]; }; message_printer: { getPainted: () => any[]; }; time_printer: Ink.Printer | { getPainted: () => any[]; }; high_precision: boolean; color: any; enabled: boolean; }>) {
        opts = (opts && typeof opts === 'object')
            ? opts : {};

        this.name = (name && typeof name === 'string')
            ? name : 'GJS Logger';

        this.print_state = (opts.print_state)
            ? true : false;

        this.json_space = (typeof opts.json_space === 'number')
            ? opts.json_space : 2;

        this.name_printer = opts.name_printer || this._getInkPrinter(true);
        this.message_printer = opts.message_printer || this._getDefaultPrinter();
        this.time_printer = opts.time_printer || this._getInkPrinter(false);
        this.high_precision = opts.high_precision || false;

        if (typeof opts.color !== 'undefined')
            this.color = opts.color;

        this._isEnabled = false;
        this._lastDebug = GLib.get_monotonic_time();

        this.enabled = (typeof opts.enabled !== 'undefined')
            ? opts.enabled : this._enabledAtStart;
    }

    get enabled() {
        return this._isEnabled;
    }

    set enabled(value) {
        if (this._isEnabled === value)
            return;

        this._isEnabled = (value) ? true : false;

        if (!this.print_state)
            return;

        let state = (this.enabled) ? 'en' : 'dis';
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
        return (message: any) => this._debug(message);
    }

    get _enabledAtStart() {
        if (!DEBUG_ENV)
            return false;

        return true
    }

    _getInkPrinter(isBold: boolean) {
        if (!Ink)
            return this._getDefaultPrinter();

        let printer = new Ink.Printer({
            color: Ink.colorFromText(this.name)
        });

        if (isBold)
            printer.font = Ink.Font.BOLD;

        return printer;
    }

    _getDefaultPrinter() {
        return {
            getPainted: function () {
                return Object.values(arguments);
            }
        };
    }

    _debug(message: any) {
        if (!this.enabled)
            return;

        this._runDebug(message);
    }

    _runDebug(message: string | Function | Symbol) {
        switch (typeof message) {
            case 'string':
                break;
            case 'object':
                if (
                    message !== null
                    && (message.constructor === Object
                        || message.constructor === Array)
                ) {
                    message = JSON.stringify(message, null, this.json_space);
                    break;
                }
            default:
                message = String(message);
                break;
        }

        let time: string | number = GLib.get_monotonic_time() - this._lastDebug;

        if (!this.high_precision) {
            time = (time < 1000)
                ? '+0ms'
                : (time < 1000000)
                    ? '+' + Math.floor(time / 1000) + 'ms'
                    : '+' + Math.floor(time / 1000000) + 's';
        }
        else {
            time = (time < 1000)
                ? '+' + time + 'µs'
                : (time < 1000000)
                    ? '+' + (time / 1000).toFixed(3) + 'ms'
                    : '+' + (time / 1000000).toFixed(3) + 's';
        }

        printerr(
            this.name_printer.getPainted(this.name),
            this.message_printer.getPainted(message),
            this.time_printer.getPainted(time)
        );

        this._lastDebug = GLib.get_monotonic_time();
    }
}
