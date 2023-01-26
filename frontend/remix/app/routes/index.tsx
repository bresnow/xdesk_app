import { Link, useCatch } from '@remix-run/react';
import Display from "~/components/DisplayHeading";
import { LoaderFunction } from "@remix-run/server-runtime";
import { json } from '@remix-run/node';
import FeatureWithImages from '@ui/kit/components/pagesection/feature/FeaturesImage2';
import FeaturesImage from '@ui/kit/components/pagesection/feature/FeaturesImage';
import { yamlData } from '@utils/config/yaml';
import { useRouteData } from '~/hooks/useRouteData';
import type { Routes } from '@types'
import NameSpacePreviewMap from '@ui/kit/components/pagesection/blog/BlogList';
import { Image } from '../../types/index';
import * as React from 'react';
import LandingStats from '~/components/LandingStats';
import { Icon } from '@ui/icon';

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

          <StaticImage
            className="w-1/2 object-cover maw-w-44 mx-auto"
            src={hero.images.foreground.src}
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
      <Hero/>
      <Component />
      {/* <LandingStats/> */}
      {/* <NaturalHero /> */}
      <NameSpacePreviewMap withSearch={true} />
      <FeatureWithImages />
      <FeaturesImage />
    </div>
  );
}
export function Footer() {
  return (
    <footer className="py-8 bg-gray-800 dark:bg-gray-900">
      <div className="container">
        <div className="grid md:grid-cols-12 items-center">
          <div className="md:col-span-3">
            <a href="#" className="logo-footer">
              <img src="assets/images/logo-light.png" className="ltr:md:ml-0 rtl:md:mr-0 mx-auto" alt="" />
            </a>
          </div>

          <div className="md:col-span-5 md:mt-0 mt-8">
            <div className="text-center">
              <p className="text-gray-400">© <script>document.write(new Date().getFullYear())</script> Upwind. Design with <i className="mdi mdi-heart text-gray-700"></i> by <a href="https://shreethemes.in/" target="_blank" className="text-reset" rel="noreferrer">Shreethemes</a>.</p>
            </div>
          </div>

          <div className="md:col-span-4 md:mt-0 mt-8">
            <ul className="list-none foot-icon ltr:md:text-right rtl:md:text-left text-center">
              <li className="inline"><a href="https://1.envato.market/upwindt" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-shopping-cart align-middle" title="Buy Now"></i></a></li>
              <li className="inline"><a href="https://dribbble.com/shreethemes" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-dribbble align-middle" title="dribbble"></i></a></li>
              <li className="inline"><a href="https://www.behance.net/shreethemes" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-behance" title="Behance"></i></a></li>
              <li className="inline"><a href="http://linkedin.com/company/shreethemes" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-linkedin" title="Linkedin"></i></a></li>
              <li className="inline"><a href="https://www.facebook.com/shreethemes" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-facebook-f align-middle" title="facebook"></i></a></li>
              <li className="inline"><a href="https://www.instagram.com/shreethemes/" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-instagram align-middle" title="instagram"></i></a></li>
              <li className="inline"><a href="https://twitter.com/shreethemes" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-twitter align-middle" title="twitter"></i></a></li>
              <li className="inline"><a href="mailto:support@shreethemes.in" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white"><i className="uil uil-envelope align-middle" title="email"></i></a></li>
              <li className="inline"><a href="https://forms.gle/QkTueCikDGqJnbky9" target="_blank" className="btn btn-icon btn-sm border rounded-md border-gray-700 dark:border-gray-800 hover:border-gray-600 bg-gray-800 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-400 hover:text-white" rel="noreferrer"><i className="uil uil-file align-middle" title="customization"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
export function StaticImage( image:  Image ) {
  const [loaded, loadedSet] = React.useState(false)
  return (
    <img
      src={image.src}
      className={`${!loaded && "blur-lg " } ${image.className ?? "absolute h-full w-full object-cover"}`}
      alt={image.alt}
      onLoad={() => {
        setTimeout(() => {
          loadedSet(false)
        },
          500
        )
      }}
      onError={(error) => {
        console.error(error)
      }}
    />
  )
}
export function NaturalHero() {
  let rootData = useRouteData<Routes>();
  let hero = rootData?.index?.sections.hero
  return (
    <div className="backdrop-blur relative overflow-hidden h-screen">

      <div className="inset-0 bg-dark opacity-25 absolute"></div>
      <header className="absolute top-0 left-0 right-0 z-20">
        <img
          src={hero.images.background.src}
          className="absolute h-full w-full hover:animate-pulse object-cover"
        />
        <nav className="container mx-auto px-6 md:px-12 py-4">
          <div className="md:flex justify-center items-center">
            <div className="flex justify-between items-center">
              <div className="md:hidden">
                <button className="text-white focus:outline-none">
                  <svg
                    className="h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                Services
              </a>
              <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                Workflow
              </a>
              <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                Value Proposition
              </a>
            </div>
          </div>
        </nav>
        <div className="container brightness-50 border-2 border-white rounded-lg mx-auto w-4/5 relative z-10 flex items-center  py-16 my-24 md:my-32">
          <img
            src={hero.images.foreground.src}
            className="absolute h-full w-full backdrop-blur-md object-cover"
          />
          <div className="w-full flex flex-col items-center justify-between relative z-10">
            <p className="flex flex-col items-center font-extrabold text-6xl text-center md:text-8xl text-white">
              {hero.subtitle}
            </p>
            {/* <p className="flex flex-col max-w-lg text-center items-center font-extrabold text-lg mt-6 text-white">
              {hero.text}
            </p>

            <a
              href="#"
              className="block bg-gray-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10"
            >
              Plant a tree
            </a> */}
          </div>
        </div>
      </header>


    </div>

  );

}
export const Component = () => {
  let rootData = useRouteData<Routes>();
  let data = rootData?.index?.sections.features_with_cards
  return (
    <section className="bg-indigo-900 relative md:py-24 py-16" id="features">
      <div  className="container lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 pb-8 items-center">
          <div>
            <h6 className="text-gray-600 text-base font-medium uppercase mb-2">{data.title}</h6>
            <h3 className="mb-4 md:text-2xl text-xl font-semibold dark:text-white md:mb-0">{data.subtitle.split(" ").reduce((prev, word, i) => i < data.subtitle.length ? prev + " " + word : prev + " " + <br /> + word)}</h3>
          </div>

          <div>
            <p className="text-gray-400 dark:text-gray-300 max-w-xl">{data.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
  {  data.cards.map(({icon, blurb, link, heading}, i)=> 
          <div className={`features p-6 hover:bg-gray-200 hover:-blur hover:shadow-xl hover:shadow-gray-100 hover:shadow-gray-800 transition duration-500 rounded-3xl mt-8`}>
            <div className="hover:scale-50 w-20 h-20 bg-gray-600 text-gray-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm">
              <Icon name={icon} size={'lg'} className={'bg-white'}/>
            </div>

            <div className="content mt-7">
              <a href="" className="text-lg hover:text-gray-600 dark:text-white dark:hover:text-gray-600 transition-all duration-500 ease-in-out font-medium">{heading}</a>
              <p className="text-gray-400 mt-3">{blurb}</p>

              <div className="mt-5">
                <a href={link} className="btn btn-link bg-indigo-600 p-3 hover:text-gray-600 dark:hover:text-gray-600 after:bg-gray-600 dark:text-white transition duration-500">Read More <i className="uil uil-arrow-right"></i></a>
              </div>
            </div>
          </div>
 ) }
          </div>
 </div>
    </section>
  )
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
