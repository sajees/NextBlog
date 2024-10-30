import Image from "next/image";
import { createClient } from "contentful";

undefined /* page.tsx */

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

const getBlogEntries = async () => {
  const entries = await client.getEntries({ content_type: "blog" });
  return entries;
};

const blogEntries = await getBlogEntries();

console.log("Home -> blogEntries", blogEntries)


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>blog listing goes here</p>
    </main>
  )
}
