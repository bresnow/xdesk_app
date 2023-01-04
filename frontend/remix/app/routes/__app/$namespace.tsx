import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import Iframe from "@ui/iframe";
import Websocket from "ws";
export function html(
  content: string,
  init: number | ResponseInit = {}
): Response {
  let responseInit = typeof init === "number" ? { status: init } : init;

  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }

  return new Response(content, {
    ...responseInit,
    headers,
  });
}
//

export let loader: LoaderFunction = async () => {
  let src = "https://namespace.cnxt.dev";
  return json({ src }, 200);
};

export default function NameSpace() {
  let src = "https://namespace.cnxt.dev";

  return (
    <>
      <Iframe src={src} className={"w-full h-full"} />
      {/* <Iframe srcdocument={data} className={"w-full h-1/2"} /> */}
    </>
  );
}
// export function CatchBoundary() {
//   let caught = useCatch();

//  switch (caught.status) {
// case 401:
//  case 403:
//     case 404:
//       return (
// <></>
// );
// }
// throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }
