import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gjsx";
const Template =
  `<interface>
  <object class="GtkBox" id="boxy">
    <property name="title">gjspack demo</property>
    <child>
      <object class="GtkVideo" id="video"></object>
    </child>
    <child>
      <object class="GtkPicture" id="picture"></object>
    </child>
  </object>
</interface>`

export const Demo = GObject.registerClass({
  GTypeName: 'Demo',
  Template: new TextEncoder().encode(Template) as any
}, class Demo extends Gtk.Widget { })