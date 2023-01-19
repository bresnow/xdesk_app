import { useCatch, useLoaderData } from '@remix-run/react';
import Display from "~/components/DisplayHeading";
import { LoaderFunction } from "@remix-run/server-runtime";
import { json } from '@remix-run/node';
import FeaturesCards from '@ui/kit/components/pagesection/feature/FeaturesCards';
import FeatureWithImages from '@ui/kit/components/pagesection/feature/FeaturesImage2';
import FeaturesImage from '@ui/kit/components/pagesection/feature/FeaturesImage';
import { yamlData } from '@utils/config/yaml';
import { useRouteData } from '~/hooks/useRouteData';
import type { Routes } from '@types'
import NameSpacePreviewMap from '@ui/kit/components/pagesection/blog/BlogList';
import { TagPreview } from '@ui/kit/components/pagesection/blog/BlogList';

export let loader: LoaderFunction = async ({ }) => {
  let { index } = yamlData().routes
  // TODO: Fetch tag preview data and merge with routes.explore
  return json(index)
}
export const Hero = () => {
  let rootData = useRouteData<Routes>();
  let hero = rootData?.index?.sections.hero
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="relative px-4 py-6 overflow-hidden sm:px-6 sm:py-8 lg:p-12 xl:p-16">
        <h2
          className={`text-2xl font-semibold font-display text-black dark:text-white sm:text-3xl`}
        >
          {hero.subtitle}
        </h2>
        <p className={`mt-2 max-w-xl text-base text-gray-400`}>
          {hero.text}
        </p>
        <form>
          <div className="sm:flex jusitfy-start mt-6">
          </div>
        </form>

        <div className="hidden lg:block absolute inset-y-0 lg:left-2/3 xl:left-1/2 right-0">

          <img
            className="w-1/2 object-cover maw-w-44 mx-auto"
            src={hero.image}
            alt={"Hero Image"}
          />

        </div>
      </div>
    </div>
  );
};
export default function Home() {
  return (
    <div className="h-screen">
      <Hero />
      <NameSpacePreviewMap withSearch={true} />
      <FeatureWithImages />
      <FeaturesImage />
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
