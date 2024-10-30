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

// console.log("Home -> blogEntries", blogEntries)


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className='w-full py-8'>
        <div className="container mx-auto px-4">
          <div className='row'>
            <div className='col'>
              <div className='flex flex-wrap flex-col md:flex-row justify-center gap-[20px]'>
                {blogEntries.items.map((singlePost) => {

                  const { slug, title, date } = singlePost.fields;
                  const imageURL = singlePost.fields.blogImage.fields.file.url;
                  const formattedImageURL = imageURL.startsWith("http") ? imageURL : `https:${imageURL}`;

                  return (
                    <div key={slug} className="w-full md:w-1/3 flex flex-col">
                      <Link href={`/articles/${slug}`} className="w-full bg-slate-50 border py-8 px-10 rounded-xl flex flex-col">
                        <h2>{title}</h2>
                        <Image src={formattedImageURL} width={300} height={200} alt={imageURL}/>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
