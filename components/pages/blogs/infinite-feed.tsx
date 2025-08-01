"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BlogWithComments } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import BlogCard from "./blog-card";
import { BlogCardSkeleton } from "./blog-card-skeletons";
type BlogResponse = {
  blogs: BlogWithComments[];
  nextPage: number | null;
};

const fetchBlogs = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<BlogResponse> => {
  const res = await fetch(`/api/blogs?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export default function BlogInfiniteFeed() {
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = useInfiniteQuery<BlogResponse, Error>({
    queryKey: ["blogs"],
    initialPageParam: 0,
    queryFn: ({ pageParam = 1 }) =>
      fetchBlogs({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref } = useInView({
    rootMargin: "200px",
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const content = data?.pages.flatMap((pg, pageIndex) =>
    pg.blogs.map((post, i, arr) => {
      const isLastCard =
        pageIndex === data.pages.length - 1 &&
        i === arr.length - 1 &&
        hasNextPage;
      return (
        <BlogCard
          key={post.id}
          blog={post}
          ref={isLastCard ? ref : undefined}
        />
      );
    })
  );

  if (status === "error") {
    return (
      <div className="flex flex-col justify-center items-center text-red-600 py-8 space-y-4">
        <p>{error.message ?? "Oops! Failed to load blogs."}</p>
        <Button
          onClick={() => {
            if (window && typeof window !== undefined) window.location.reload();
          }}>
          <RefreshCcw className="size-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {status === "pending"
          ? Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
          : content}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center my-2">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </>
  );
}
