"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BrushCleaningIcon,
  ChevronLeft,
  ChevronRight,
  CompassIcon,
  ListFilterIcon,
  Search,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MinimalBlogCardSkeleton } from "@/components/pages/blogs/blog-card-skeletons";
import { Card, CardFooter } from "@/components/ui/card";
import { getCookie, setCookie } from "@/lib/cookie";
import { BlogWithComments } from "@/types";
import { getBlogsByIds } from "@/lib/actions/library";
import MinimalBlogCard from "@/components/pages/blogs/minimal-blog-card";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const BLOGS_PER_PAGE = 5;

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogWithComments[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  //   useEffect to fetch history data
  useEffect(() => {
    const fetchHistory = async () => {
      const readingHistory = getCookie("history");

      if (!readingHistory) {
        setIsLoading(false);
        return;
      }
      try {
        const historyArray: number[] = JSON.parse(readingHistory);
        if (Array.isArray(historyArray) && historyArray.length > 0) {
          const res = (await getBlogsByIds(historyArray)) as BlogWithComments[];
          setBlogs(res);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  //   reset on page change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);
  //   function to clear history
  const clearHistory = () => {
    setCookie("history", JSON.stringify([]), -1);
    setBlogs([]);
    toast.success("Reading history cleared");
  };
  function handleClearHistory() {
    toast.custom(
      (t) => (
        <div className="bg-card  border border-border rounded-lg p-4 shadow flex flex-col gap-4 max-w-sm relative">
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute text-sm -top-2 -left-2 text-muted-foreground hover:text-destructive bg-inherit border border-border rounded-full p-1 shadow"
            aria-label="Close">
            <XIcon className="size-4" />
          </button>
          <p className="font-medium text-sm">
            Are you sure you want to clear all your reading history?
          </p>
          <p className="text-sm text-muted-foreground">
            This action will permanently delete all your saved activity and
            cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                toast.dismiss(t);
                clearHistory();
              }}>
              Confirm
            </Button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 10000,
      }
    );
  }
  //   function to remove blog from history
  function removeFromHistory(id: number) {
    const cookie = getCookie("history");
    const historySet = JSON.parse(cookie);
    const index = historySet.indexOf(id);
    if (index !== -1) {
      historySet.splice(index, 1);
    }
    setCookie("history", JSON.stringify(historySet), 30);
    setBlogs(() => blogs.filter((item) => item.id !== id));
    toast.success("Blog removed from history");
  }
  // 🔍 Search + Filtered Blogs (memoized)
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog?.tags
            ?.split(",")
            .some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );
    }

    switch (sortBy) {
      case "newest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "lastEdited":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [blogs, searchQuery, sortBy]);
  //   pages
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );
  return (
    <section>
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs..."
            disabled={isLoading || blogs.length === 0}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-900"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {" "}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className=" bg-white cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-950 sm:w-48"
              title="filter blogs"
              disabled={isLoading || blogs.length === 0}>
              <ListFilterIcon className="h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="lastEdited">Last Edited</SelectItem>
            </SelectContent>
          </Select>
          {blogs && blogs.length > 0 && (
            <button
              className="bg-background border inline-flex items-center text-destructive text-sm hover:bg-destructive hover:text-white h-9 rounded-md gap-1.5 px-3 py-1.5 has-[>svg]:px-2.5 whitespace-nowrap font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              title="clear all history"
              disabled={isLoading || blogs.length === 0}
              onClick={handleClearHistory}>
              <BrushCleaningIcon className="size-4" />
              Clear All
            </button>
          )}
        </div>
      </div>
      {/* render blogs */}
      {isLoading ? (
        <div className="grid gap-6">
          {Array.from({ length: 5 }, (_, i) => (
            <MinimalBlogCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredBlogs && filteredBlogs.length > 0 ? (
        <div className="grid gap-6">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="relative">
              <button
                className="absolute text-sm top-2 right-2 md:-top-1 md:-right-1 z-20 bg-card border border-border hover:shadow hover:scale-110 transition-all duration-700 rounded-full p-1 cursor-pointer"
                type="button"
                title="remove from reading history"
                onClick={() => removeFromHistory(blog.id)}
                aria-label="remove from history">
                <XIcon className="size-4 fill-red-500 text-red-500" />
              </button>
              <MinimalBlogCard
                blog={blog}
                onUpdate={() => null}
                onDelete={() => null}
              />
            </div>
          ))}
        </div>
      ) : (
        <Card>
          {" "}
          <div className="flex items-center justify-center py-1">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724795120/illustrations/autumn-reading-male-svgrepo-com_jtp0oc.svg"
              width="200"
              height="200"
              alt="reading illustration"
              title="reading illustration"
              priority
              className="italic align-middle"
            />
          </div>
          <CardFooter className="text-center flex flex-col items-center justify-center space-y-2">
            <h3 className="font-semibold text-lg">
              Your reading history is empty.
            </h3>
            <p className="max-w-sm leading-loose text-xs sm:text-sm mx-auto">
              Go back to your feed and read posts that spark your interest. Each
              post you read will be listed here.
            </p>
            <Link href="/featured" passHref>
              {" "}
              <Button className="mt-2">
                {" "}
                <CompassIcon className="size-4" />
                Explore Blogs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            <ChevronLeft /> Prev
          </Button>
          <span className="font-semibold text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }>
            Next <ChevronRight />
          </Button>
        </div>
      )}
    </section>
  );
}
