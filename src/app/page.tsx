import Image from "next/image";
import Link from "next/link";
import { createClient } from "contentful";
import { BlogQueryResult } from "./types";

undefined /* page.tsx */

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

const getBlogEntries = async ():Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "blog" });
  return entries;
};

const blogEntries = await getBlogEntries();

console.log("Home -> blogEntries", blogEntries)


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date } = singlePost.fields;
        return (
          <div key={slug}>
            <Link href={`/articles/${slug}`}>
              <h2>{title}</h2>
              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </main>
  )
}
