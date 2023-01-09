import { Outlet, useCatch } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import type { LoaderContext } from "@types";
import { ContentForm } from '@ui/form';
import Display from "~/components/DisplayHeading";
export const meta: MetaFunction = () => ({
  title: "Explore",
});
export let loader: LoaderFunction = async ({ params, request, context }) => {
  let loadCtx = context as unknown as LoaderContext;
  return {
    header: {
      title: "browse",
      subtitle: "Explore the Remix ecosystem",
    },
  };
};
export const handle = {
  header: {
    title: "Explore",
  },
};

export default function ExploreRoute () {
  return (
    <div>
    <ContentForm />
      <Outlet />
    </div>
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
