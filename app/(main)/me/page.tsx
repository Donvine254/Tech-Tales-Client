import React from "react";
import Profile from "./profile";
import { getUserData } from "@/lib/actions/user";
import { getTopAuthor } from "@/lib/actions/analytics";
import { Metadata } from "next";
import { isVerifiedUser } from "@/dal/auth-check";

export const metadata: Metadata = {
  title: "My Profile - Customize and manage your user information",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
  const user = await isVerifiedUser();
  const data = await getUserData(user.userId);
  const isTopAuthor = await getTopAuthor(user.userId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <Profile data={data} isTopAuthor={isTopAuthor} />
    </div>
  );
}
