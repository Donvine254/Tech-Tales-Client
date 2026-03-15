"use client";
import { getBlogsByIds } from "@/lib/actions/library";
import { recommendBlogs } from "@/lib/actions/recommendations";
import { useSession } from "@/providers/session";
import type { BlogWithComments } from "@/types";
import { useInView } from "react-intersection-observer";
import MinimalBlogCard from "../blogs/minimal-blog-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type Props = {
  blogId: number;
  author: {
    username: string;
    id: number;
    handle: string;
  };
  tags: string; // ← string not string[]
};

async function fetchRecommendations({
  blogId,
  authorId,
  tags,
  userId,
}: {
  blogId: number;
  authorId: number;
  tags: string;
  userId?: number;
}): Promise<BlogWithComments[]> {
  const cachedBookmarks = localStorage.getItem("bookmarked_blogs");
  const bookmarkedBlogs = cachedBookmarks ? JSON.parse(cachedBookmarks) : {};
  const bookmarkedBlogIds: number[] = Object.keys(bookmarkedBlogs)
    .filter((id) => bookmarkedBlogs[id])
    .map((id) => Number(id));
  let blogIds: number[] = [];
  if (userId) {
    // Logged-in — DB history
    blogIds = await recommendBlogs({
      blogId,
      tags,
      authorId,
      userId,
      bookmarks: bookmarkedBlogIds,
    });
  } else {
    // Guest — localStorage history
    const raw = localStorage.getItem("read_history");
    const guestHistory = raw ? (JSON.parse(raw).reads ?? []) : [];

    blogIds = await recommendBlogs({
      blogId,
      tags,
      authorId,
      bookmarks: bookmarkedBlogIds,
      guestHistory,
    });
  }

  return (await getBlogsByIds(blogIds)) as unknown as BlogWithComments[];
}

export default function Recommendations({ blogId, author, tags }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "500px" });
  const { session } = useSession();
  const userId = session?.userId;

  const { data: blogs, isFetching } = useQuery({
    queryKey: ["recommendations", blogId, author.id, tags, userId],
    queryFn: () =>
      fetchRecommendations({ blogId, authorId: author.id, tags, userId }),
    enabled: inView && typeof window !== "undefined",
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="my-2 py-4 border-t border-border" ref={ref}>
      {inView && (
        <>
          <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4">
            Recommended for you
          </h2>
          {isFetching ? (
            <Card className="w-full flex items-center justify-center h-48">
              <div className="w-8 h-8 border-3 text-blue-400 text-4xl animate-spin border-primary flex items-center justify-center border-t-blue-400 rounded-full" />
            </Card>
          ) : (
            <div className="grid gap-6 divide-x-2">
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <MinimalBlogCard
                    key={blog.id}
                    blog={blog}
                    onUpdate={() => null}
                    onDelete={() => null}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 py-16">
                  <SearchX className="w-12 h-12 mb-4 text-muted-foreground" />
                  <h3 className="text-xl md:text-2xl font-semibold">
                    No Recommendations Found
                  </h3>
                  <p className="text-muted-foreground">
                    🥹 Sorry we couldn&apos;t find any related blogs to show
                    right now.
                  </p>
                  <Link href={`/explore/${author.handle}`} passHref>
                    <Button variant="outline" className="w-fit">
                      View more from {author.username}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
