import Posts from "./posts";
import { getUserBlogs } from "@/lib/actions/user";
import { Metadata } from "next";
import { isVerifiedUser } from "@/dal/auth-check";

export const metadata: Metadata = {
  title: "My Blogs - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function Page() {
  const user = await isVerifiedUser();
  const blogs = await getUserBlogs(user.userId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Posts data={blogs} />
    </div>
  );
}
