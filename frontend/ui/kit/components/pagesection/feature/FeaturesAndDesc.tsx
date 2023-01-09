import React from "react";
import Button from "../../elements/buttons/Button";

const FeaturesAndDesc = ({ header, description }: { header: string; description: string }) => {
  return (
    <section>
      <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
        <div className="flex flex-wrap -mx-8">
          <div className="w-full lg:w-1/2 px-8">
            <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
              <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading dark:text-white">
                {header}
              </h2>
              <p className="mb-8 leading-loose text-gray-500 dark:text-gray-300">
                {description}
              </p>
              <div className="w-full md:w-1/3">
                {/* <Button label="See more" color="indigo" /> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-8">
            <ul className="space-y-12">
              <li className="flex -mx-4">
                <div className="px-4">
                  <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                    1
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    Value Over Price
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose">

                  </p>
                </div>
              </li>
              <li className="flex -mx-4">
                <div className="px-4">
                  <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                    2
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    Dynamic Domains for Dynamic Content
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose">

                  </p>
                </div>
              </li>
              <li className="flex -mx-4">
                <div className="px-4">
                  <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                    3
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    The Platform That Builds Platforms
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose">

                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesAndDesc;
