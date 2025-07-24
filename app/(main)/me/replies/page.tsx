import { getUserComments } from "@/lib/actions/comments";
import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import Replies from "./replies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Replies - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
  const session = (await getSession()) as Session | null;
  if (!session || !session.userId) {
    redirect("/");
  }
  const comments = await getUserComments(session?.userId);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      {/* render the comments component here */}
      <Replies data={comments} />
    </div>
  );
}
