import { getUserComments } from "@/lib/actions/comments";
import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import Replies from "./replies";

export default async function page() {
  const session = (await getSession()) as Session | null;
  if (!session || !session.userId) {
    redirect("/");
  }
  const comments = await getUserComments(session?.userId);
  console.log(comments);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      {/* render the comments component here */}
      <Replies data={comments} />
    </div>
  );
}
