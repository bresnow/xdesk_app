import { useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import Iframe from "@ui/iframe";
import axios from "redaxios"
import { LoaderContext } from '@types';
import { Header } from "@ui/dialog/dialog";
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

export let loader: LoaderFunction = async ({ params, context }) => {
  let namespace = params?.namespace, src: string;
  let loadContext = context as unknown as LoaderContext;
  src = `https://${namespace}.cnxt.dev`
  try {
    let response = await axios.get(src);
    console.log(JSON.stringify({ status: response.status }, null,))
  } catch (error) {
    return redirect("/explore")
  }
  return json({ src }, 200);
}
export default function NameSpace() {
  let { src } = useLoaderData<{ src: string }>();
  return (<Iframe src={src} className={"w-full h-full"} />);
}
export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 403:
    case 404:
      return (
        <>
          <Header>
            <div className={"flex justify-center"}>
              <h1 className={"text-5xl font-extrabold text-gray-900"}>
                {caught.status}
              </h1>
            </div>
          </Header>
        </>
      );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
