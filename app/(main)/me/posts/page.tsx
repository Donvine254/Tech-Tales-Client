import React from "react";
import Posts from "./posts";
import { getSession } from "@/lib/actions/session";
import { redirect } from "next/navigation";
import { BlogWithComments, Session } from "@/types";
import { getUserBlogs } from "@/lib/actions/user";

export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session) {
    redirect("/");
  }
  const blogs = (await getUserBlogs(session.userId)) as BlogWithComments[];
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Posts blogs={blogs} />
    </div>
  );
}
