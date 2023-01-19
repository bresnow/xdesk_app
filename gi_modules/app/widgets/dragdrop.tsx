
import Gdk from "gi://Gdk"
import GObject from 'gi://GObject';
import Gtk from "gi://Gtk?version=4.0"


const COLUMN_TEXT = 0;
const COLUMN_PIXBUF = 1;
const TARGET_ENTRY_TEXT = 0;
const TARGET_ENTRY_PIXBUF = 1;
const DRAG_ACTION = Gdk.DragAction.COPY;

const DragDropWindow = GObject.registerClass({
    GTypeName: 'DragDropWindow',
}, class extends Gtk.ApplicationWindow {
    iconview:   any;
    drop_area: any;
    constructor(opts:Gtk.ApplicationWindow_ConstructProps) {
     super(opts)
     this.application = opts.application
        var vbox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 6
        });
        this.set_child(vbox);

        var hbox = new Gtk.FlowBox({
            orientation: Gtk.Orientation.HORIZONTAL,
        });
        vbox.append(hbox);

        this.iconview = new DragSourceIconView();
        this.drop_area = new DropArea();

        hbox.pack_start(this.iconview, true, true, 0);
        hbox.pack_start(this.drop_area, true, true, 0);

        var button_box = new Gtk.Box({ spacing: 6 });
        vbox.pack_start(button_box, true, true, 0);

        var image_button = new Gtk.Button();
        image_button.connect('toggled', (button) => {
            let targets = new Gtk.DropTarget()
            targets.set_propagation_phase (TARGET_ENTRY_PIXBUF);

            this.drop_area.drag_dest_set_target_list(targets);
            this.iconview.drag_source_set_target_list(targets);
        });
        button_box.append(image_button);

        var text_button = Gtk.Button.new_with_label( 'Text');
        text_button.connect('toggled', (button) => {
            this.drop_area.drag_dest_set_target_list(null);
            this.iconview.drag_source_set_target_list(null);

            this.drop_area.drag_dest_add_text_targets();
            this.iconview.drag_source_add_text_targets();
        });
        button_box.append(text_button);
    }

    run() {
        this.present();
        this.application.run([])
    }
});

export const DragSourceIconView = GObject.registerClass({
    GTypeName: 'DragSourceIconView'}, class extends Gtk.IconView{
    _init() {
        super._init();
        this.set_text_column(COLUMN_TEXT);
        this.set_pixbuf_column(COLUMN_PIXBUF);

        var model = new Gtk.ListStore();
        model.set_column_types([GObject.TYPE_STRING]);
        this.set_model(model);
        this.add_item('Item 1');
        this.add_item('Item 2');
        this.add_item('Item Three');

        this.enable_model_drag_source(Gdk.ModifierType.BUTTON1_MASK | Gdk.ModifierType.MOD1_MASK, null,Gdk.DragAction.DEFAULT | DRAG_ACTION);
        this.connect('drag-data-get', (widget, drag_context, data, info, time) => {
            let selected_path = this.get_selected_items()[0];
            let selected_iter = this.get_model().get_iter(selected_path)[1];

            if (info === TARGET_ENTRY_TEXT) {
                let text = this.get_model().get_value(selected_iter, COLUMN_TEXT);
                data.set_text(text, -1);
            } else if (info === TARGET_ENTRY_PIXBUF) {
                let pixbuf = this.get_model().get_value(selected_iter, COLUMN_PIXBUF);
                data.set_pixbuf(pixbuf);
            }
        })
    }
    add_item(text:string) {
        var pixbuf = Gtk.IconTheme;
        var model = this.get_model();
        model.set(model.append(), [0, 1], [text, pixbuf]);
    }
});

export const DropArea = GObject.registerClass({
    GTypeName: 'DropArea'},
    class extends Gtk.Label{

    _init() {
        super._init();
        this.label='Drop something on me!'
        this.connect('drag-data-received', (widget, drag_context, x, y, data, info, time) => {
            if (info === TARGET_ENTRY_TEXT) {
                let text = data.get_text();
                print('Received text ' + text);
            } else if (info === TARGET_ENTRY_PIXBUF) {
                let pixbuf = data.get_pixbuf();
                let width = pixbuf.get_width();
                let height = pixbuf.get_height();
                print('Received pixbuf with width ' + width + 'px and height ' + height + 'px');
            }
        });
    }
});

    var win = new DragDropWindow({ application: new Gtk.Application() });
    win.run();
   


