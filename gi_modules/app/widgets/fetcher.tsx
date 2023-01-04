import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Gjsx from "gi://Gjsx";
import { WebViewer } from './webviewer.js';
const { encode } =Gjsx; 


const FetchWidget = GObject.registerClass({}, class  extends Gtk.Widget {
    constructor(parameters:Gtk.Widget_ConstructProps) {
        super(parameters)
    }
})