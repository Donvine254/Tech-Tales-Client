import type { Metadata } from "next";
import { isVerifiedUser } from "@/dal/auth-check";
import { getUserComments } from "@/lib/actions/comments";
import Replies from "./replies";

export const metadata: Metadata = {
	title: "My Replies - Tech Tales",
	description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
	const user = await isVerifiedUser();
	const comments = await getUserComments(user.userId);
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-accent">
			{/* render the comments component here */}
			<Replies data={comments} />
		</div>
	);
}
