/* eslint-disable @next/next/no-head-element */
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from "@ui/styles.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import "chainlocker";
import { json } from "@remix-run/node";
import Display from "./components/DisplayHeading";
import { yamlData } from '../utils/config/yaml';
import { EnhancedScripts } from "./components/external-scripts";
import CNXTLogo from '@ui/svg/logos/CNXT';

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};
export let meta: MetaFunction = ({ data }) => ({
  ...data.root.meta,
  charset: "utf-8",
  title: data.root.meta.title,
  viewport: "width=device-width,initial-scale=1",
});
export const loader: LoaderFunction = async () => {
  var { routes } = yamlData()
  return json(routes);
};
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-b-xl z-40">
          <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
            <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
              <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                <CNXTLogo to={"/"} />
              </div>
              <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
              </div>
            </div>
          </div>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <EnhancedScripts />
      </body>
    </html>
  );
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


