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
import type { LoaderContext } from "../types";
import styles from "@ui/styles.css";
import type { LinksFunction } from "@remix-run/server-runtime";
import "chainlocker";
import { json } from "@remix-run/node";
import { Config } from "@utils/config";
import Display from "./components/DisplayHeading";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};
export let meta: MetaFunction = ({ data }) => ({
  ...data,
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});
export const loader: LoaderFunction = async ({ request, context }) => {
  var rootmetadata = await getMetaData(context, request)
  return json(rootmetadata);
};
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
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


export async function vaultLocker(context: unknown) {
  let loaderContext = context as unknown as LoaderContext;
  let { authorizedDB } = await loaderContext();
  let { gun, MasterKeys } = authorizedDB();
  gun.vault(Config.DOMAIN, MasterKeys);
  return {locker(args?: string[]) { return args ? gun.locker([MasterKeys.pub, ...args]) : gun.locker([MasterKeys.pub]) }}
}

async function getMetaData(context: unknown, request: Request): Promise<Record<string, any>> {
  let loaderContext = context as unknown as LoaderContext;
  let { authorizedDB } = await loaderContext();
  let { gun, MasterKeys } = authorizedDB();
  gun.vault(Config.DOMAIN, MasterKeys);
  let locker = gun.locker([MasterKeys.pub]);
  let { pages } = await locker.value((data) => (data));
  let rootmetadata = pages.root.meta;
  let url = new URL(request.url);
  rootmetadata = JSON.parse(
    JSON.stringify(rootmetadata)
      .split("<%--protocol-host--%>")
      .join(url.protocol + url.host)
  );
  return rootmetadata;
}