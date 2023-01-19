import { useRouteData } from '~/hooks/useRouteData';
import type { Routes } from '@types'
import React from 'react';

export type Features_wImg_Props = { title: string; subtitle: string; text: string; list?: string[] }
const FeatureWithImages = () => {
  let rootData = useRouteData<Routes>();
  let features = rootData?.index?.sections.feature_with_images
  return (
    <section id={"feature_with_images"} className="max-w-screen-xl p-4 rounded-xl  dark:bg-gray-800 bg-opacity-5 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:mt-20">
      <div className="relative">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
            <p className="text-base leading-6 text-indigo-500 font-semibold uppercase">
              {features?.title}
            </p>
            <h4 className="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
              {features?.subtitle}
            </h4>
            <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
              {features?.text}
            </p>
          
          </div>

          <section className="transition-all group mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
            <div className="relative space-y-4">
              <div className="flex items-end justify-center lg:justify-start space-x-4" >
                {features.images?.map((image, i) => i < 2 ? (

                  <img
                    className={image.className ?? "rounded-lg hover:scale-50 shadow-lg w-32 md:w-56"}
                    width={image.width}
                    src={image.src}
                    alt={image.alt}
                  />
                ) : null
                )
                }
              </div>
              <div className="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                {features.images?.map((image, i) => (i > 2 && i < 5) ? (

                  <img
                    className={image.className ?? "rounded-lg hover:scale-50 shadow-lg w-32 md:w-56"}
                    width={image.width}
                    src={image.src}
                    alt={image.alt}
                  />
                ) : null
                )
                }
              </div>
            </div>
            <ul className="mt-8 md:grid md:grid-cols-2 gap-6">
              {features?.list?.map((feat, index) => {
                return (
                  <li key={index} className="mt-6 lg:mt-0">
                    <div className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                        {feat}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};
export default FeatureWithImages;
