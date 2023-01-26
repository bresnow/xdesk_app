import { LoaderArgs, redirect } from "@remix-run/node"
import LZString from "lz-string";
export async function loader({ request }: LoaderArgs) {
    let search = new URL(request.url).searchParams
    let path = search.get('path'), compressed = search.get('compressed');
    if (compressed === 'true' && path)
        path = LZString.decompressFromEncodedURIComponent(path)
    if (path)
    path.startsWith("/")? path = path.slice(1) : path = path?.replace("_", "/");
    return redirect(`/${path}`)
};