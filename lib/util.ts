import Gtk from "gi://Gtk?version=4.0";
import GLib from "gi://GLib";
import Gio from "gi://Gio";
import system from "system";

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}

export function promiseTask(
  object: any,
  method: string,
  finish: string,
  ...args: any
) {
  return new Promise((resolve, reject) => {
    object[method](...args, (self: any, asyncResult: any) => {
      try {
        resolve(object[finish](asyncResult));
      } catch (err) {
        reject(err);
      }
    });
  });
}

function normalizeEmitter(emitter) {
  const addListener =
    emitter.on || emitter.addListener || emitter.addEventListener;
  const removeListener =
    emitter.off || emitter.removeListener || emitter.removeEventListener;

  if (!addListener || !removeListener) {
    throw new TypeError("Emitter is not compatible");
  }

  return {
    addListener: addListener.bind(emitter),
    removeListener: removeListener.bind(emitter),
  };
}

function promiseSignal(object, signal, error_signal) {
  return new Promise((resolve, reject) => {
    const handler_id = object.connect(signal, handler);
    let error_handler_id;

    function cleanup() {
      object.disconnect(handler_id);
      if (error_handler_id) object.disconnect(error_handler_id);
    }

    if (error_signal) {
      error_handler_id = object.connect(error_signal, (self, error) => {
        cleanup();
        reject(error);
      });
    }

    function handler(self, ...params) {
      cleanup();
      resolve(params);
    }
  });
}

function promiseEvent(object, signal, error_signal) {
  const { addListener, removeListener } = normalizeEmitter(object);

  return new Promise((resolve, reject) => {
    addListener(signal, listener);

    function cleanup() {
      removeListener(signal, listener);
      if (error_signal) removeListener(error_signal, error_listener);
    }

    if (error_signal) {
      addListener(error_signal, error_listener);
    }

    function error_listener(err) {
      cleanup();
      reject(err);
    }

    function listener(...params) {
      cleanup();
      resolve(params);
    }
  });
}

export function delay(ms: number) {
  let timeout_id;
  const promise = new Promise<void>((resolve) => {
    // @ts-ignore
    setTimeout(() => {
      resolve();
    }, ms);
  });
  return promise;
}

async function timeout(ms: number) {
  return delay(ms).then(() => {
    throw new TimeoutError(`Promise timed out after ${ms} milliseconds`);
  });
}

export function once(
  object,
  signal,
  options = {
    error: "",
    timeout: -1,
  }
) {
  let promise;
  if (object.connect && object.disconnect) {
    promise = promiseSignal(object, signal, options.error);
  } else {
    promise = promiseEvent(object, signal, options.error);
  }

  if (options.timeout < 0) {
    return promise;
  }

  const promise_timeout = timeout(options.timeout);
  return Promise.race([promise, promise_timeout]).finally(() => {
    // @ts-ignore
    clearTimeout(promise_timeout.timeout_id);
  });
}

function noop(...args) {}

// @ts-ignore
export class Deferred extends Promise {
  constructor(def = noop) {
    let res, rej;
    super((resolve, reject) => {
      def(resolve, reject);
      res = resolve;
      rej = reject;
    });
    // @ts-ignore
    this.resolve = res;
    // @ts-ignore
    this.reject = rej;
  }
}

export function getGIRepositoryVersion(repo) {
  const { get_major_version, get_minor_version, get_micro_version } = repo;
  return `${get_major_version()}.${get_minor_version()}.${get_micro_version()}`;
}

export function getGLibVersion() {
  return `${GLib.MAJOR_VERSION}.${GLib.MINOR_VERSION}.${GLib.MICRO_VERSION}`;
}

export function getGjsVersion() {
  const v = system.version.toString();
  return `${v[0]}.${+(v[1] + v[2])}.${+(v[3] + v[4])}`;
}

// To use with import.meta.url
export function resolve(uri, path) {
  return GLib.build_filenamev([
    GLib.path_get_dirname(GLib.Uri.parse(uri, null).get_path()),
    path,
  ]);
}

export function getPid() {
  const credentials = new Gio.Credentials();
  return credentials.get_unix_pid();
}
function getFileInfo(): string[] {
  let stack = new Error().stack,
    stackLine = stack.split("\n")[1],
    coincidence,
    path,
    file;
  if (!stackLine) throw new Error("Could not find current file (1)");
  coincidence = new RegExp("@(.+):\\d+").exec(stackLine);
  if (!coincidence) throw new Error("Could not find current file (2)");
  path = coincidence[1];
  file = Gio.File.new_for_path(path);
  let route = file.get_parent().get_path().split(":")[1];
  let current = route + "/" + file.get_basename();
  return [route, current];
}
// https://gitlab.gnome.org/GNOME/gjs/-/merge_requests/784
export function* readDirSync(file: Gio.File) {
  const enumerator = file.enumerate_children(
    "standard::name",
    Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS,
    null
  );

  while (true) {
    try {
      const info = enumerator.next_file(null);
      if (info === null) break;
      yield enumerator.get_child(info);
    } catch (err) {
      enumerator.close(null);
      throw err;
    }
  }
  enumerator.close(null);
}

export function readTextFileSync(file: Gio.File) {
  const [, contents] = file.load_contents(null);
  return decode(contents);
}

export function writeTextFileSync(file: Gio.File, contents: Uint8Array) {
  file.replace_contents(
    contents, // contents
    null, // etag
    false, // make_backup
    Gio.FileCreateFlags.NONE, // flags
    null // cancellable
  );
}

export function decode(data: any) {
  //@ts-ignore
  return new TextDecoder().decode(data);
}

export function appIdToPrefix(appid: string) {
  return `/${appid.replace(".", "/")}`;
}

export function basename(filename: string) {
  const [name, basename, extension] =
    GLib.path_get_basename(filename).match(/(.+?)(\.[^.]*$|$)/);
  return [name, basename, extension];
}

export function theme(argv: typeof ARGV, themeName?: string) {
  let gtkSettings = Gtk.Settings.get_default();
  if (argv.some((info) => info === "--dark")) {
    gtkSettings = Gtk.Settings.get_default();
    gtkSettings.gtk_application_prefer_dark_theme = true;
    gtkSettings.gtk_theme_name = themeName ?? "PRO-dark-XFCE-edition II";
  } else {
    gtkSettings = Gtk.Settings.get_default();
    gtkSettings.gtk_application_prefer_dark_theme = false;
    gtkSettings.gtk_theme_name = themeName ?? "Mc-OS-Transparent";
  }
}
