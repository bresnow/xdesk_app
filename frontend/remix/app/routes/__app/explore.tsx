import { Outlet } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import type { LoaderContext } from "../../../types/index";
import { ContentForm } from '../../../../ui/form/form';
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
      <Outlet />
    <ContentForm />
    </div>
  );
}
