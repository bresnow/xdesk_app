import { useCatch, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import Iframe from "@ui/iframe";
import axios from "redaxios"
import { LoaderContext } from '@types';
import { Header } from "@ui/dialog/dialog";
import Display from "~/components/DisplayHeading";
import {CreateForm} from "~/components";
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

  return json({ src: "src" }, 200);
}
export default function NameSpace() {
  let { src } = useLoaderData<{ src: string }>();
  console.log(src);
  
  return (<CreateForm/>);
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 403:
    case 404:
      return (
        <div className='min-h-screen py-4 flex flex-col justify-center items-center'>
          <Display
            title={`${caught.status}`}
            titleColor='white'
            span={`${caught.statusText}`}
            spanColor='pink-500'
            description={`${caught.statusText}`}
          />
        </div>
      );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className='min-h-screen py-4 flex flex-col justify-center items-center'>
      <Display
        title='Error:'
        titleColor='#cb2326'
        span={error.message}
        spanColor='#fff'
        description={`error`}
      />
    </div>
  );
}
