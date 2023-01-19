import { json, LoaderArgs } from "@remix-run/node";
import { javascript } from "@utils/responses";
import fs from "fs-extra"
import path from "path"
export async function loader({ params }: LoaderArgs) {
  let script = params.script
  try {
    var filename = path.resolve(path.join("..", "remix", "utils", "resource", "scripts", `${script}.js`)),
      contents = fs.readFileSync(filename, 'utf8')
    // TODO: add bundling option from query params?
    return javascript(contents)
  } catch (e) {
    console.error(e)
    return json({ Error: `/${script}.js didnt load from resource route. console.error(${e})` })
  };
};