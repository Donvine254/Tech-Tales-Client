import Posts from "./posts";
import { getSession } from "@/lib/actions/session";
import { redirect } from "next/navigation";
import { Session } from "@/types";
import { getUserBlogs } from "@/lib/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blogs - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session) {
    redirect("/");
  }
  const blogs = await getUserBlogs(session.userId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Posts data={blogs} />
    </div>
  );
}
