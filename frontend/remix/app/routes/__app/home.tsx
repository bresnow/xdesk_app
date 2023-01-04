import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import NameSpacePreviewMap from "@ui/kit/components/pagesection/blog/BlogList";
import { AccountMenu } from "@ui/account-menu";
import axios from "redaxios"
export let loader: LoaderFunction = async () => {
  let data
  try {
    let res = await axios.post("http://0.0.0.0:3333/api/connect", {
      body: JSON.stringify({
        data: {
          tweets: [
            {
              body: "Hello World... lorem ipsum dolor sit amet enim ad minim veniam -- aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              id: "1",
              created_at: Date.now(),
              tag: "#test",
              is_liked: true,
              num_likes: 2003,
              user: {
                avatarUrl:
                  "https://avatars0.githubusercontent.com/u/17098?s=460&v=4",
                name: "Bresnow",
                username: "bresnow",
              },
              is_retweeted: true,
              num_replies: 0,
              num_retweets: 700,
            }]
        },
      }
      ),
      headers: {
        "Content-Type": "application/json",
      }
    })
    data = res.data
  } catch (error) {
    data = error
  }

  return json(data);
};

export const handle = {
  header: {
    title: "Home",
  },
};

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <>
      <p>{JSON.stringify(data)}</p>
        <div className="my-[5px] h-0 border-b border-gray-200" />
      </>
      <AccountMenu />
      <NameSpacePreviewMap />
    </div>
  );
}
