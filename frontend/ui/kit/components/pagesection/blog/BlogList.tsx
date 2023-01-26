import { useRouteData } from "~/hooks/useRouteData";
import FormSubscribe from "../../form/layout/FormSubscribe";
import NameSpaceCard from "./BlogCard";
import { Routes } from "@types";

interface Props {
  withSearch?: boolean;
  routeId?: string;
}
export type TagPreview = {
  tags: string[];
  title: string;
  link: string;
  service: string;
  img: string;
  desc: string;
}[];

const NameSpacePreviewMap = (props: Props) => {
  let route = useRouteData<Routes>();
  let ns = route.index.sections.namespace_preview;
  return (
    <div className="w-full bg-white p-12 mb-3">
      <div className="header flex items-end justify-between mb-12">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">{}</p>
        </div>
        {props.withSearch && (
          <div className="text-end">
            <FormSubscribe label="Search" placeholder="Enter a title" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-18">
        {ns &&
          ns?.map((s) => {
            return (
              <NameSpaceCard
                key={s?.title}
                tags={s?.tags}
                link={`/resource/redirect?path=${s?.link}`}
                title={s?.title}
                service={s?.service}
                img={s?.img}
                desc={s?.desc}
                showAuthor={false}
                showTags={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NameSpacePreviewMap;
