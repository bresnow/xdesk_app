import Gtk from "gi://Gtk?version=4.0";

export function useBuilder<T>(ui: any, id?: string) {
  return build<T>(id ?? null, builder(ui));
}
export function builder(resource: string) {
  return Gtk.Builder.new_from_string(resource, resource.length);
}

export type GetObject = <Object>(id: string) => Object | null;

export function build<GtkClass>(
  id: string | undefined,
  builder: Gtk.Builder
): [GtkClass | null, GetObject] {
  return [
    getObject<GtkClass>(builder, id),
    (n: string) => getObject(builder, n),
  ];
}

export function getObject<Object>(
  builder: Gtk.Builder,
  id: string
): Object | null {
  return builder.get_object(id) as unknown as Object;
}
