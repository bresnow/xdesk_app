import Gjsx from 'gi://Gjsx';
import Gtk from "gi://Gtk?version=4.0";

//test
export type Services = {
  name: string;
  icon_path?: string;
  icon_name?: string;
  clickHandler(button:Gtk.Button):void;
};

const style = {
  box: { 
    padding: "15px", 
    background: "rgba(0, 0, 50, 0.8)", 
    color: "#fff", 
    borderRadius: "15px" 
  },
  

}
export function HeadLayout({
  services,
}: {
  services: Services[];
}) {



  return (
    <Gtk.Box spacing={18} style={style.box} orientation={Gtk.Orientation.HORIZONTAL}>
      {services.map(
        ({ name, icon_path,  clickHandler }, i) => {
          return (
            <Gtk.Button
              onClicked={clickHandler}
              halign={Gtk.Align.CENTER}
              label={name}
              css_name="buttonbottom"
            >
              <Gtk.Image file={icon_path} style={{ marginLeft: "5px" }} pixel_size={65} />
            </Gtk.Button>
          );
        }
      )}
    </Gtk.Box>
  );
}
