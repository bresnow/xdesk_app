import React from "react";
import IconSvg from '../../../../svg/logos/SvgIcon';
import {useRouteData} from '~/hooks/useRouteData';
import type{Routes} from '@types'
const FeaturesCards = () => {
    let rootData = useRouteData<Routes>();
  let cards = rootData?.index?.sections.feature_cards
  return (
    <div className="sm:flex flex-wrap justify-center items-center text-center gap-8">
      { cards?.map(({iconPath, heading, description})=> (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  shadow-lg rounded-lg dark:bg-gray-800">
          <div className="flex-shrink-0">
            <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <IconSvg path={iconPath } />
            </div>
          </div>
          <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            {heading}
          </h3>
          <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
         {description}
          </p>

        </div>
      ))}
      
     
    </div>
  );
};
export default FeaturesCards;
