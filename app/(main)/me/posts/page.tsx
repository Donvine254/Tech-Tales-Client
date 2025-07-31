import Posts from "./posts";
import { getUserBlogs } from "@/lib/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blogs - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function Page() {
  const blogs = await getUserBlogs();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Posts data={blogs} />
    </div>
  );
}
