import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx";
import { WebViewer } from './webviewer.js';

const { encode } =Gjsx; 
/**
 * Use JSX as a Builder Resource to build Gtk Widgets as if it were .ui files. 
 * Gtk.Builder.new_from_string would also work as the Gjsx.render() function returns
 *  these intrinsic jsx/xml properties as a string.
 */
export const Button=
  <object class="GtkButton" id="button">
    <property name="label">Let's go!</property>
    <property name="halign">center</property>
    <signal name="clicked" handler="onButtonClicked"></signal>
    <style>
      <class name="suggested-action" />
    </style>
  </object>
export const ResourceTemplateDemo =
  <interface>
    <template class="MyWidget" >
      <property name="layout-manager">
        <object class="GtkBoxLayout">
          <property name="orientation">vertical</property>
        </object>
      </property>
      <child>
        <object class="GtkImage" id="picture">
          <property name="file">/gjsx/gi_modules/assets/images/x_icon.png</property>
          <property name="icon-size">large</property>
          <property name="pixel-size">200</property>
        </object>
      </child>
      <child>
        <object class="GtkLabel" id="welcomeLabel">
          <property name="visible">false</property>
          <property name="wrap">true</property>
          <property name="justify">center</property>
        </object>
      </child>
      <child>
        {Button}
      </child>
    </template>
  </interface>
export const buildaBitch =
  <interface>
    <object class="GtkBox" id="root">
      <property name="orientation">vertical</property>
      <child>
        <object class="GtkLabel" id="helloLabel">
          <property name="vexpand">1</property>
          <property name="label">Hello World!</property>
        </object>
      </child>
      <child>
        <object class="GtkButton" id="actionButton">
          <property name="label" translatable="yes">Action</property>
          <property name="receives_default">1</property>
              <style>
      <class name="suggested-action" />
    </style>
        </object>
      </child>
      <child>
        <object class="GtkButton" id="closeButton">
          <property name="label" translatable="yes">Close</property>
          <property name="receives_default">1</property>
              <style>
      <class name="suggested-action" />
    </style>
        </object>
      </child>
    </object>
  </interface>
  
export const Demo = GObject.registerClass(
  {
    GTypeName: "MyWidget",
    Template: encode(ResourceTemplateDemo)
  },
  class extends Gtk.Box {
    _init() {
      super._init();
    };
    onButtonClicked(_button: Gtk.Button) {
      let window: Gtk.Window, builder: Gtk.Builder, app = new Gtk.Application(), webmsg = new WebViewer();
      try {
        window = new Gtk.Window({ application: app }), builder = Gtk.Builder.new_from_string(buildaBitch, buildaBitch.length)
        let root = builder.get_object('root');

        var actionButton= builder.get_object('actionButton');
        actionButton.connect('clicked', () => {
          print('actionButton clicked')
        })

        var closeButton= builder.get_object('closeButton')
        closeButton.connect('clicked', () => {
          print('closeButton clicked')
        });

      } catch (error) {
        _button.label = error.message
      }
    }
  }
);
