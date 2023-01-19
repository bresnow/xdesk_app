import type { LoaderArgs } from "@remix-run/node";
import { image as img } from "@utils/responses";
import fs from "fs-extra"
import path from "path"
import { json } from '@remix-run/node';
export async function loader({ params }: LoaderArgs) {
  let ext = params.ext, filename = params.filename, directory = params.directory as string, contents;
  try {
    var pathto = path.resolve(path.join("..", "remix", "utils", "resource", directory, `${filename}.${ext}`));
    contents = fs.createReadStream(pathto)
    contents.on("data", (data) => {
    });
    contents.push(null);
    contents.on("error", (err) => { 
      
    })
    // return img(, {type:mime})
    return json(`${filename}.${ext}`)
  } catch (e) {
    console.error(e)
    return json(`console.error(${e})`)
  };
};

export type Application =
  "EDI-X12" |
  "EDIFACT" |
  "javascript" |
  "octet-stream" |
  "ogg" |
  "pdf" |
  "xhtml+xml" |
  "x-shockwave-flash" |
  "json" |
  "ld+json" |
  "xml" |
  "zip" |
  "x-www-form-urlencoded"
export type Audio =
  "mpeg" |
  "x-ms-wma" |
  "vnd.rn-realaudio" |
  "x-wav"
export type Image =
 "gif" |
  "jpeg" |
  "png" |
  "tiff" |
  "vnd.microsoft.icon" |
  "x-icon" |
  "vnd.djvu" |
  "svg+xml"
export type Multipart =
  "mixed" |
  "alternative" |
  "related" |
  "form-data"
export type Text =
  "css" |
  "csv" |
  "html" |
  "javascript" |
  "plain" |
  "xml"
export type Video =
  "mpeg" |
  "mp4" |
  "quicktime" |
  "x-ms-wmv" |
  "x-msvideo" |
  "x-flv" |
  "webm"
export type VND =
  "vnd.oasis.opendocument.text" |
  "vnd.oasis.opendocument.spreadsheet" |
  "vnd.oasis.opendocument.presentation" |
  "vnd.oasis.opendocument.graphics" |
  "vnd.ms-excel" |
  "vnd.openxmlformats-officedocument.spreadsheetml.sheet" |
  "vnd.ms-powerpoint" |
  "vnd.openxmlformats-officedocument.presentationml.presentation" |
  "msword" |
  "vnd.openxmlformats-officedocument.wordprocessingml.document" |
  "vnd.mozilla.xul+xml"