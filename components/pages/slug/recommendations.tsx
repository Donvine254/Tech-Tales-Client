"use client";
import { getBlogsByIds } from "@/lib/actions/library";
import { recommendBlogs } from "@/lib/actions/recommendations";
import { getCookie } from "@/lib/cookie";
import { BlogWithComments } from "@/types";
import { useState, useEffect } from "react";
import { MinimalBlogCardSkeleton } from "../blogs/blog-card-skeletons";
import MinimalBlogCard from "../blogs/minimal-blog-card";

type Props = {
  blogId: number;
  authorId: number;
  tags: string[];
};
export default function Recommendations({ blogId, authorId, tags }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogWithComments[]>([]);
  // render only when the page mounts
  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);
  //   get history and bookmarks
  useEffect(() => {
    async function getData() {
      const history = getCookie("history");
      const historyArray: number[] = history ? JSON.parse(history) : [];

      const cachedBookmarks = localStorage.getItem("bookmarked_blogs");
      const bookmarkedBlogs = cachedBookmarks
        ? JSON.parse(cachedBookmarks)
        : {};
      const bookmarkedBlogIds: number[] = Object.keys(bookmarkedBlogs)
        .filter((id) => bookmarkedBlogs[id])
        .map((id) => Number(id));

      const blogIds = await recommendBlogs({
        blogId,
        tags,
        authorId,
        history: historyArray,
        bookmarks: bookmarkedBlogIds,
      });

      const data = (await getBlogsByIds(blogIds)) as BlogWithComments[];
      setBlogs(data);
      setIsLoading(false);
    }

    getData();
  }, [authorId, tags, blogId]);

  if (!isMounted || !blogs || blogs.length < 1) {
    return false;
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
        Recommended from Tech Tales
      </h2>
      {isLoading ? (
        <div className="grid gap-6">
          {Array.from({ length: 5 }, (_, i) => (
            <MinimalBlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div>
          {blogs &&
            blogs.length > 0 &&
            blogs.map((blog) => (
              <MinimalBlogCard
                key={blog.id}
                blog={blog}
                onUpdate={() => null}
                onDelete={() => null}
              />
            ))}
        </div>
      )}
    </div>
  );
}
