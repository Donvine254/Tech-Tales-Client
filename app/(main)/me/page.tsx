import type { Metadata } from "next";
import React from "react";
import { isVerifiedUser } from "@/dal/auth-check";
import { getTopAuthor } from "@/lib/actions/analytics";
import { getUserData, getUserTopBlogs } from "@/lib/actions/user";
import type { BlogWithComments, UserProfileData } from "@/types";
import Profile from "./profile";

export const metadata: Metadata = {
	title: "My Profile - Customize and manage your user information",
	description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
	const user = await isVerifiedUser();
	const data = (await getUserData()) as UserProfileData;
	const blogs = (await getUserTopBlogs()) as unknown as BlogWithComments[];
	const isTopAuthor = await getTopAuthor(user.userId);
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-accent">
			<Profile user={data} blogs={blogs} isTopAuthor={isTopAuthor} />
		</div>
	);
}
