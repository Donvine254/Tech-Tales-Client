import { getUserFavorites } from "@/lib/actions/library";
import { getSession } from "@/lib/actions/session";
import { BlogWithComments, Session } from "@/types";
import { redirect } from "next/navigation";
import Library from "./library";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};
export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session) {
    redirect("/");
  }
  const favorites = (await getUserFavorites()) as BlogWithComments[];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-accent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <div className="mb-8 text-center sm:text-start ">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            My Reading List
          </h1>
          <p className="text-muted-foreground">
            See your favorite blogs and bookmarked posts.
          </p>
        </div>
        {/* Add Library page here */}
        <Library initialFavorites={favorites} userId={session.userId} />
      </div>
    </div>
  );
}
