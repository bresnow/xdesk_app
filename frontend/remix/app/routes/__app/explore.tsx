import { useCatch, useLoaderData } from '@remix-run/react';
import NameSpacePreviewMap from "@ui/kit/components/pagesection/blog/BlogList";
import Display from "~/components/DisplayHeading";
import FeaturesAndDesc from '@ui/kit/components/pagesection/feature/FeaturesAndDesc'
import { LoaderFunction } from "@remix-run/server-runtime";
import { json } from '@remix-run/node';
import FeaturesCards from '@ui/kit/components/pagesection/feature/FeaturesCards';
import FeaturesImage from '@ui/kit/components/pagesection/feature/FeaturesImage';
import FeaturesImage2 from '@ui/kit/components/pagesection/feature/FeaturesImage2';
import { yamlData } from '@utils/config/yaml';
export const handle = {
  header: {
    title: "#://CNXT",
  },
};
export let loader: LoaderFunction = async ({  context }) => {
  let {routes} = yamlData()
  return json(routes.explore)
}
export default function Home() {
  let data = useLoaderData()
  
  return (
    <div className="h-screen">
      <FeaturesImage2 heading={''} subtitle={''} description={''} features={["Serverless Computing", "Programatic Assets"]} />
      <FeaturesImage />
      <FeaturesCards />
      <FeaturesAndDesc
        header={data.header.title}
        description={data.text}
      />
      <NameSpacePreviewMap />
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
