import Image from "next/image";
import { createClient } from "contentful";
import { BlogItem } from "@/app/types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

type BlogPageProps = {
    params: {
        slug: string;
    }
};

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
    const queryOptions = {
      content_type: "blog",
      "fields.slug[match]": slug,
    };
    const queryResult = await client.getEntries(queryOptions);
    return queryResult.items[0];
};

export async function generateStaticParams() {
    const queryOptions = {
      content_type: "blog",
      select: "fields.slug",
    };
    const articles = await client.getEntries(queryOptions)
    return articles.items.map((item) => ({ slug: item.fields.slug }));
}



export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = params;
    const article = await fetchBlogPost(slug);
    
    const { title, date, content } = article.fields;
    const imageURL = article.fields.blogImage.fields.file.url;
    const formattedImageURL = imageURL.startsWith("http") ? imageURL : `https:${imageURL}`;

    return (
        <main className="min-h-screen p-24 flex justify-center">
            <section className='w-full py-8'>
                <div className="container max-w-[970px] mx-auto px-4">
                    <div className='row'>
                        <div className='col'>
                            <h1 className="text-lg font-bold">{title}</h1>
                            <Image src={formattedImageURL} width={300} height={200} alt={imageURL}/>
                            <p className="mb-6 text-slate-400 ">
                            Posted on{" "}
                            {new Date(date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            </p>
                            <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
                                { documentToReactComponents(content) }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}