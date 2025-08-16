"use client";
import { getBlogsByIds } from "@/lib/actions/library";
import { recommendBlogs } from "@/lib/actions/recommendations";
import { getCookie } from "@/lib/cookie";
import { BlogWithComments } from "@/types";
import { useState, useEffect, useRef } from "react";
import MinimalBlogCard from "../blogs/minimal-blog-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

type Props = {
  blogId: number;
  author: {
    username: string;
    id: number;
    handle: string;
  };
  tags: string[];
};
// TODO: Change this to use useinview and react-query
export default function Recommendations({ blogId, author, tags }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState<BlogWithComments[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);
  //   get history and bookmarks
  useEffect(() => {
    if (!show) return;
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
        authorId: author.id,
        history: historyArray,
        bookmarks: bookmarkedBlogIds,
      });

      const data = (await getBlogsByIds(blogIds)) as BlogWithComments[];
      setBlogs(data);
      setIsLoading(false);
    }

    getData();
  }, [show, author.id, tags, blogId]);

  return (
    <div className="my-2 py-4 border-t border-border" ref={containerRef}>
      {show && (
        <>
          {" "}
          <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4">
            Recommended for you
          </h2>
          {isLoading ? (
            <Card className="w-full flex items-center justify-center h-48">
              <div className="w-8 h-8 border-3 text-blue-400 text-4xl animate-spin border-primary flex items-center justify-center border-t-blue-400 rounded-full"></div>
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
          )}{" "}
        </>
      )}
    </div>
  );
}
