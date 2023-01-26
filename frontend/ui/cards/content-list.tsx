import React from "react";
import { ContentUnit } from "./content-unit";

export type TweetsProps = {
  units: any[];
};

export const TweetList = ({ units }: TweetsProps) => {
  return (
    <div>
      {units.map((unit) => (
        <ContentUnit unit={unit} key={unit.path} />
      ))}
    </div>
  );
};
