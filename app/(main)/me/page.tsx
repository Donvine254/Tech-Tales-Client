import React from "react";
import Profile from "./profile";
import { getUserData } from "@/lib/actions/user";
import { getTopAuthor } from "@/lib/actions/analytics";
import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Customize and manage your user information",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
  const session = (await getSession()) as Session | null;
  if (!session || !session.userId) {
    redirect("/");
  }
  const data = await getUserData(session?.userId);
  if (!data.user) {
    redirect("/");
  }
  const isTopAuthor = await getTopAuthor(session?.userId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Profile data={data} isTopAuthor={isTopAuthor} />
    </div>
  );
}
