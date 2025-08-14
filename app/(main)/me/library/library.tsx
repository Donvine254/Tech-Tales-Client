"use client";
import { MinimalBlogCardSkeleton } from "@/components/pages/blogs/blog-card-skeletons";
import MinimalBlogCard from "@/components/pages/blogs/minimal-blog-card";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleBlogLiking } from "@/lib/actions/favorites";
import { getBlogsByIds } from "@/lib/actions/library";
import { cn } from "@/lib/utils";
import { BlogWithComments } from "@/types";
import {
  BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  CompassIcon,
  HeartIcon,
  ListFilterIcon,
  Loader2,
  Search,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
interface SavedBlogsPageProps {
  initialFavorites: BlogWithComments[];
  userId: number;
}
const BLOGS_PER_PAGE = 5;
export default function Library({
  initialFavorites,
  userId,
}: SavedBlogsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<BlogWithComments[]>([]);
  const [favorites, setFavorites] =
    useState<BlogWithComments[]>(initialFavorites);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("bookmarks");
  //   loading state for unfavorite button
  const [loading, setLoading] = useState<number | null>(null);
  //fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const cachedBookmarks = localStorage.getItem("bookmarked_blogs");
        if (!cachedBookmarks) {
          setIsLoading(false);
          return;
        }
        const bookmarkedBlogs = cachedBookmarks
          ? JSON.parse(cachedBookmarks)
          : {};
        const bookmarkedBlogIds = Object.keys(bookmarkedBlogs)
          .filter((id) => bookmarkedBlogs[id])
          .map((id) => Number(id));

        if (bookmarkedBlogIds.length > 0) {
          const res = (await getBlogsByIds(
            bookmarkedBlogIds
          )) as BlogWithComments[];
          setBookmarks(res);
        }
      } catch (error) {
        console.error("Error fetching bookmarked blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
    // 🟢 Listen for bookmark removal
    const handleBookmarkRemoved = (e: Event) => {
      const blogId = (e as CustomEvent<number>).detail;
      setBookmarks((prev) => prev.filter((blog) => blog.id !== blogId));
    };

    window.addEventListener("bookmark-removed", handleBookmarkRemoved);

    return () => {
      window.removeEventListener("bookmark-removed", handleBookmarkRemoved);
    };
  }, []);
  //   reset current page when active tab, search query, or sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy]);

  //   function to remove blog from favorites
  const removeFromFavorites = async (blogId: number) => {
    setLoading(blogId);
    const favoriteToRemove = favorites.find((blog) => blog.id === blogId);
    setFavorites((prev) => prev.filter((blog) => blog.id !== blogId));
    try {
      const res = await handleBlogLiking(blogId, userId, "DISLIKE");
      if (!res.success) {
        if (favoriteToRemove) {
          setFavorites((prev) => [favoriteToRemove, ...prev]);
        }
        toast.error("Failed to remove from favorites");
        return;
      }
      toast.success("Blog removed from favorites");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      if (favoriteToRemove) {
        setFavorites((prev) => [favoriteToRemove, ...prev]);
      }
      toast.error("Failed to remove blog from favorites");
    } finally {
      setLoading(null);
    }
  };

  //   function to sort and search blogs
  const sortBlogs = (blogs: BlogWithComments[]) => {
    return [...blogs].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "lastEdited":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });
  };

  const searchBlogs = (blogs: BlogWithComments[]) => {
    if (!searchQuery) return blogs;
    return blogs.filter(
      (blog) =>
        blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog?.tags
          ?.split(",")
          .some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  const filteredBookmarks = useMemo(() => {
    return sortBlogs(searchBlogs(bookmarks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarks, searchQuery, sortBy]);

  const filteredFavorites = useMemo(() => {
    return sortBlogs(searchBlogs(favorites));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, searchQuery, sortBy]);

  const paginatedBlogs = (blogs: BlogWithComments[]) => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;
    return blogs.slice(start, end);
  };
  const paginatedBookmarks = paginatedBlogs(filteredBookmarks);
  const paginatedFavorites = paginatedBlogs(filteredFavorites);
  const currentBlogs =
    activeTab === "bookmarks" ? filteredBookmarks : filteredFavorites;
  const totalPages = Math.ceil(currentBlogs.length / BLOGS_PER_PAGE);
  return (
    <section>
      <Tabs
        defaultValue="bookmarks"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full">
        <TabsList className="w-max space-x-4 bg-card dark:bg-gray-950 shadow">
          <TabsTrigger
            value="bookmarks"
            className={cn(
              "flex items-center gap-2 hover:bg-secondary group data-[state=active]:border-2 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white",
              activeTab === "published" &&
                "bg-blue-500 hover:bg-blue-600 text-white"
            )}>
            <span
              className={cn(
                activeTab === "published" && "dark:text-white",
                "group-data-[state=active]:text-white"
              )}>
              {" "}
              <span className="hidden sm:block">Bookmarked Blogs</span>
              <span className="sm:hidden">Bookmarks</span>
            </span>
            <span
              className={cn(
                "bg-muted text-muted-foreground group-data-[state=active]:text-primary  px-1.5 py-0.5 rounded-sm text-xs",
                activeTab === "published" && "dark:text-white"
              )}>
              {bookmarks.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className={cn(
              "flex items-center gap-2 group hover:bg-secondary data-[state=active]:border-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white group",
              activeTab === "published" &&
                "bg-blue-500 hover:bg-blue-600 text-white"
            )}>
            <span
              className={cn(activeTab === "favorites" && "dark:text-white")}>
              {" "}
              <span className="hidden sm:block">Favorite Blogs</span>
              <span className="sm:hidden">Favorites</span>
            </span>
            <span
              className={cn(
                "bg-muted text-muted-foreground group-data-[state=active]:text-primary px-1.5 py-0.5 rounded-sm text-xs",
                activeTab === "published" && "dark:text-white"
              )}>
              {favorites.length}
            </span>
          </TabsTrigger>
        </TabsList>
        {/* Search and Sort Controls */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className="w-min bg-white cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-950 sm:w-48"
              title="filter blogs">
              <ListFilterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                <SelectValue placeholder="Sort by" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="lastEdited">Last Edited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="bookmarks" className="grid gap-6">
          {isLoading ? (
            <div className="grid gap-6">
              {Array.from({ length: 5 }, (_, i) => (
                <MinimalBlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {paginatedBookmarks.length > 0 ? (
                paginatedBookmarks.map((blog) => (
                  <MinimalBlogCard
                    key={blog.id}
                    blog={blog}
                    onUpdate={() => null}
                    onDelete={() => null}
                  />
                ))
              ) : (
                <EmptyState variant="bookmarks" />
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="grid gap-6">
          {paginatedFavorites.length > 0 ? (
            paginatedFavorites.map((blog) => (
              <div key={blog.id} className="relative">
                <button
                  type="button"
                  disabled={loading === blog.id}
                  title="click to remove blog from favorites"
                  onClick={() => {
                    removeFromFavorites(blog.id);
                  }}
                  className="absolute top-2 right-2 md:-top-1 md:-right-1 z-20 p-1 bg-card border border-border hover:shadow hover:scale-110 transition-all duration-700 rounded-full cursor-pointer text-sm">
                  {loading === blog.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XIcon className="size-4 fill-red-500 text-red-500" />
                  )}
                </button>
                <MinimalBlogCard
                  blog={blog}
                  liked={true}
                  onUpdate={() => null}
                  onDelete={() => null}
                />
              </div>
            ))
          ) : (
            <EmptyState variant="favorites" />
          )}
        </TabsContent>
      </Tabs>
      {/* pagination */}
      {currentBlogs.length > BLOGS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="cursor-pointer items-center">
            <ChevronLeft /> Prev
          </Button>
          <span className="font-semibold text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="cursor-pointer items-center"
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

const EmptyState = ({ variant }: { variant: "bookmarks" | "favorites" }) => (
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
    {variant === "bookmarks" ? (
      <CardFooter className="text-center flex flex-col items-center justify-center space-y-2">
        <h3 className="font-semibold text-lg">You have no bookmarked blogs.</h3>
        <p className="font-medium text-xs sm:text-sm">
          Click the{" "}
          <span className="font-semibold text-blue-500">
            {" "}
            bookmark reaction
          </span>
          <BookmarkIcon className="inline-block mx-1 align-middle size-4 text-blue-500" />
          when viewing a post to add it to your reading list.
        </p>
      </CardFooter>
    ) : (
      <CardFooter className="text-center flex flex-col items-center justify-center space-y-2">
        <h3 className="font-semibold text-lg">You have no favorite blogs.</h3>
        <p className="font-medium text-xs sm:text-sm">
          Click the{" "}
          <span className="font-semibold text-red-500"> favorite reaction</span>
          <HeartIcon className="inline-block mx-1 align-middle size-4 text-red-500" />
          when viewing a post to add it to your reading list.
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
    )}
  </Card>
);
