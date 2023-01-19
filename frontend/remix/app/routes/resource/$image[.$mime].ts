import type { LoaderArgs } from "@remix-run/node";
import { image as img } from "@utils/responses";
import fs from "fs-extra"
import path from "path"
import { json } from '@remix-run/node';
export async function loader({params}: LoaderArgs) {
    let mime = params.mime, image = params.image, contents;
  try {
      var filename = path.resolve(path.join("..", "remix", "utils", "resource", `${image}.${mime}`));
          contents =  fs.createReadStream(filename)
          contents.on("data", (data)=> {
          });
          contents.push(null);
          contents.on("error",(err)=>{})
          // return img(, {type:mime})
          return json(`${image}.${mime}`)
  } catch (e) {
    console.error(e)
    return json(`console.error(${e})`)
  };
};