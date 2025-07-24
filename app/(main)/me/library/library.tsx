"use client";
import MinimalBlogCard from "@/components/pages/blogs/minimal-blog-card";
import { Card, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogWithComments } from "@/types";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
interface SavedBlogsPageProps {
  bookmarks: BlogWithComments[];
  favorites: BlogWithComments[];
}

export default function Library({ bookmarks, favorites }: SavedBlogsPageProps) {
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

        <TabsContent value="bookmarks">
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

        <TabsContent value="favorites">
          {favorites.length > 0 ? (
            favorites.map((blog) => (
              <MinimalBlogCard
                key={blog.id}
                blog={blog}
                onUpdate={() => null}
                onDelete={() => null}
              />
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
