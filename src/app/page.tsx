import Image from "next/image";
import Link from "next/link";
import { createClient } from "contentful";
import { BlogQueryResult } from "./types";
import * as styles from "./styles.module.css";

undefined /* page.tsx */

if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN) {
  throw new Error("Missing Contentful configuration in environment variables.");
}

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});


const getBlogEntries = async ():Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "blog" });
  return entries;
};

const getSponsors = async () => {
  const entries = await client.getEntries({ content_type: "sponsors" });
  return entries;
};

const blogEntries = await getBlogEntries();

const sposorSectionEntries = await getSponsors();

const { title, description, cta, ourSponsors } = sposorSectionEntries.items[0].fields;

const sponsorTitle = typeof title === 'string' ? title : null;
const sponsorDescription = typeof description === 'string' ? description : null;
const sponsorLink = typeof cta === 'string' ? cta : null;
const sponsorsList = Array.isArray(ourSponsors) ? ourSponsors : null;


// const sponsorTitle = sposorSectionEntries.items[0].fields.title;

// console.log("Home -> sposorsEntries", sposorSectionEntries);


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
      <section className='w-full py-8 bg-dark_blue xl:py-[120px]'>
        <div className="container mx-auto px-4">
          <div className='row'>
            <div className='col'>
              <div className='flex'>
                <div className="w-1/3 text-white">
                  {sponsorTitle && <h2 className="text-xxl leading-xxl mb-4">{sponsorTitle}</h2>}
                  {sponsorDescription && <p className="mb-10">{sponsorDescription}</p>}
                  {sponsorLink && (
                    <Link href={sponsorLink} className="bg-btn-gradient px-7 py-3 min-h-[54px] rounded-xxl text-md font-bold">
                      Explore Our Sponsors
                    </Link>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center pl-10">
                  <div className="max-w-[700px] overflow-hidden">
                    <div className={`gap-x-3 flex ${styles.animateLogos}`}>
                      {sponsorsList && sponsorsList.map((sponsor, i) => {
                        const { logo, title } = sponsor.fields;
                        return (
                          <div key={i}>
                            <div className="w-[170px] h-[140px] rounded-md bg-white_10">
                              <Image className="object-scale-down w-full h-full object-center" src={`https:${logo.fields.file.url}`} alt={title} width={100} height={100} />
                              {/* <h3>{title}</h3> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
