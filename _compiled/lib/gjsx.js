import Gtk from "gi://Gtk?version=4.0";
const Fragment = Symbol("Fragment") || Symbol("");
const createWidget = (Widget, attributes, ...args) => {
  const children = args ? args.map((args2) => args2) : [];
  return { Widget, attributes, children };
};
const renderUi = ({ element, attr, childs }) => {
  if (typeof element === "string") {
    let hasChild = false,
      nested;
    let regex =
      /(interface|requires|object|template|property|signal|child|menu|item|attribute|link|submenu|section)/gi;
    if (regex.test(element)) {
      let props = Object.entries(attr).reduce(
        (acc, [key, val]) => ` ${acc} ${key}="${val}" `,
        ""
      );
      if (childs) {
        hasChild = true;
        nested = childs
          .map((child) => {
            if (typeof child.element === "string") return renderUi(child);
          })
          .reduce((prev, curr) => "\n" + prev + "\n" + curr, "");
      }
      element = `<${element}${props && props}${
        !hasChild ? "/>" : `>${nested}</${element}>`
      }`;
    }
    log(element);
    return element;
  }
};
const render = ({ Widget, attributes, children }) => {
  if (!isConstructor(Widget) && typeof Widget === "string") {
    if (!/(interface)/gi.test(Widget)) {
      log("GJSXML template must be enclosed within an interface element.");
    }
    return renderUi({ element: Widget, attr: attributes, childs: children });
  }
  if (!isConstructor(Widget) && typeof Widget === "function") {
    return render(Widget(attributes));
  }
  if (Widget === Fragment) {
    return children;
  }
  const signals = {};
  const styleClass = {};
  const constructParams = {};
  for (const attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      const element = attributes[attr];
      const attributName = camelToKebab(attr);
      log(attr);
      log(element);
      if (attr.startsWith("on")) {
        const signal = attributName.replace("on-", "");
        signals[signal] = element;
      } else if (attr === "class") {
        styleClass[attr.replace("Name", "")] = element;
      } else {
        constructParams[attr] = element;
      }
    }
  }
  const widget = new Widget({ visible: true, ...constructParams });
  for (const signal in signals) {
    if (signals.hasOwnProperty(signal)) {
      const handler = signals[signal];
      widget.connect(signal, handler);
    }
  }
  if (children) {
    children
      .reduce((acc, val) => acc.concat(val), [])
      .map((child) => {
        if (typeof child === "string") {
          return new Gtk.Label({ label: child, visible: true });
        } else {
          return render(child);
        }
      })
      .forEach((child) => {
        if (typeof widget.append === "function") {
          widget.append(child);
        } else if (typeof widget.add_child === "function") {
          widget.add_child(child);
        } else if (typeof widget.set_child === "function") {
          widget.set_child(child);
        }
      });
  }
  const isWindow = Widget === Gtk.ApplicationWindow || Widget === Gtk.Window;
  if (isWindow && typeof widget.present === "function") widget.present();
  return widget;
};
function camelToKebab(string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}
function isConstructor(f) {
  try {
    new f();
  } catch (err) {
    return false;
  }
  return true;
}
export default { render, createWidget, isConstructor, renderUi };
