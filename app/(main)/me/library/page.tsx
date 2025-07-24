import { MinimalBlogCardSkeleton } from "@/components/pages/blogs/blog-card-skeletons";
import { getUserFavorites } from "@/lib/actions/library";
import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session) {
    redirect("/");
  }
  const favorites = await getUserFavorites(session.userId);
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

        {favorites.length > 0 ? (
          <div className="grid gap-6">
            {favorites.map((blog) => (
              <MinimalBlogCardSkeleton key={blog.id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no favorite blogs.</p>
        )}
      </div>
    </div>
  );
}
