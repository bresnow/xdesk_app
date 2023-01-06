import React from "react";
import FormSubscribe from "../../form/layout/FormSubscribe";
import NameSpaceCard from "./BlogCard";

interface Props {
  withSearch?: boolean;
}

const NameSpacePreviewMap = (props: Props) => {
  const blogs = [
    {
      tags: ["#GOD", "#STARCASH"],
      title: "#KLYSTAR",
      link: "/namespace",
      service: "#SmartContract",
      img: "/images/gradient.webp",
      desc: "Dr. Ying Platform example...",
    },
    {
      tags: ["#DRIVE", "#FILES"],
      title: "#FILESHARE",
     link : "/drive",
      service: "#FileStorage",
      img: "/images/gradient1.webp",
      desc: "Google Drive Example",
    }
  ];

  return (
    <div className="w-full bg-white p-12">
      <div className="header flex items-end justify-between mb-12">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800 mb-4">Explore</p>
          <p className="text-2xl font-light text-gray-400">Example Namespaces</p>
        </div>
        {props.withSearch && (
          <div className="text-end">
            <FormSubscribe label="Search" placeholder="Enter a title" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-18">
        {blogs.map((blog) => {
          return (
            <NameSpaceCard
              key={blog.title}
              tags={blog.tags}
              link={blog.link}
              title={blog.title}
              service={blog.service}
              img={blog.img}
              desc={blog.desc}
              showAuthor={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NameSpacePreviewMap;
