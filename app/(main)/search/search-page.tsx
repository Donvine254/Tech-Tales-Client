"use client";
import { useMemo } from "react";
import BlogCard from "@/components/pages/blog-card";
import CategoryFilters from "@/components/pages/category-filters";
import { BlogWithComments } from "@/types";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SearchPage({
  blogs,
}: {
  blogs: BlogWithComments[] | [];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredBlogs = useMemo(() => {
    if (!query) return []; // Return nothing if no search term

    return blogs.filter((blog) => {
      const titleMatch = blog.title.toLowerCase().includes(query);

      const tagArray = blog.tags
        ? blog.tags.split(",").map((tag) => tag.trim().toLowerCase())
        : [];

      const tagMatch = tagArray.some((tag) => tag.includes(query));

      return titleMatch || tagMatch;
    });
  }, [blogs, query]);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8">
      {/* Header section */}
      <div className="py-4 border-b border-border mb-6">
        <h1 className="text-primary/70 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif">
          <span>Search results for </span>
          <span className="text-primary">{query}</span>
        </h1>
      </div>
      <CategoryFilters className="my-8" />
      {/* search results */}
      {filteredBlogs && filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs &&
            filteredBlogs.map((post, index: number) => (
              <BlogCard key={index} blog={post} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 text-primary/70">
          <SearchX className="w-12 h-12 mb-4 text-muted-foreground" />
          <h2 className="text-xl md:text-2xl font-semibold">
            Well, this is awkward
          </h2>
          <p className="mt-2 max-w-md">
            Nothing is turning up based on your search phrase. Try using a
            different search word or check out our blogs.
          </p>
        </div>
      )}
    </section>
  );
}
