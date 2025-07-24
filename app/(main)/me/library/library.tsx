"use client";
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
import { BlogWithComments } from "@/types";
import {
  BookmarkIcon,
  Heart,
  HeartIcon,
  ListFilterIcon,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface SavedBlogsPageProps {
  bookmarks: BlogWithComments[];
  favorites: BlogWithComments[];
}

export default function Library({ bookmarks, favorites }: SavedBlogsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  return (
    <section>
      <Tabs defaultValue="bookmarks" className="w-full">
        <TabsList className="w-max space-x-4 bg-card dark:bg-gray-950 shadow">
          <TabsTrigger
            value="bookmarks"
            className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-blue-500 group">
            Bookmarks
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs group-data-[state=active]:text-primary">
              {bookmarks.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2 data-[state=active]:border-2 data-[state=active]:border-blue-500 group">
            Favorites
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs group-data-[state=active]:text-primary">
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
          {bookmarks.length > 0 ? (
            bookmarks.map((blog) => (
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
        </TabsContent>

        <TabsContent value="favorites" className="grid gap-6">
          {favorites.length > 0 ? (
            favorites.map((blog) => (
              <div key={blog.id} className="relative">
                <Button
                  variant="ghost"
                  type="button"
                  title="click to remove course from wishlist"
                  className="absolute top-2 right-2 z-20 rounded-full  backdrop-blur transition-all bg-red-100/20 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  size="icon">
                  <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                </Button>
                <MinimalBlogCard
                  blog={blog}
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
      </CardFooter>
    )}
  </Card>
);
