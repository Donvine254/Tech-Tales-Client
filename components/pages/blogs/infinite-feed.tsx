"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BlogWithComments } from "@/types";
import { Button } from "@/components/ui/button";
import BlogCard from "./blog-card";
import { BlogCardSkeleton } from "./blog-card-skeletons";
import { RefreshCcw, SearchX } from "lucide-react";
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
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      fetchBlogs({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hr
  });
  const { ref } = useInView({
    rootMargin: "400px",
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
      <div className="flex flex-col items-center justify-center text-center py-16  space-y-4">
        <SearchX className="w-12 h-12 mb-4 text-muted-foreground" />
        <h2 className="text-xl md:text-2xl font-semibold text-destructive">
          Well, this is awkward
        </h2>
        <p className="mt-2 text-xs sm:text-sm max-w-md text-muted-foreground">
          We couldn&apos;t find any blogs in our server. The server responded
          with the following error. {""}
          <span className="mt-2 max-w-md">
            Error: {error?.message || "Unknown"}
          </span>
        </p>
        <Button
          variant="outline"
          onClick={() => {
            if (window && typeof window !== undefined) window.location.reload();
          }}
          className="hover:text-blue-500 group">
          <RefreshCcw className="size-4 group-hover:animate-spin" />
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
        <div className="flex items-center justify-center my-2 py-4">
          <div className="w-8 h-8 border-3 text-blue-400 text-4xl animate-spin border-primary flex items-center justify-center border-t-blue-400 rounded-full"></div>
        </div>
      )}
    </>
  );
}
