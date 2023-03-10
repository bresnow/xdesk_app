import Gtk from "gi://Gtk?version=4.0";
export function useBuilder(ui, id) {
  return build(id ?? null, builder(ui));
}
export function builder(resource) {
  return Gtk.Builder.new_from_string(resource, resource.length);
}
export function build(id, builder2) {
  return [getObject(builder2, id), (n) => getObject(builder2, n)];
}
export function getObject(builder2, id) {
  return builder2.get_object(id);
}
