"use client";
import { useMemo, useState } from "react";
import BlogCard from "@/components/pages/blogs/blog-card";
import CategoryFilters from "@/components/pages/blogs/category-filters";
import { BlogWithComments } from "@/types";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Fuse from "fuse.js";
const BLOGS_PER_PAGE = 6;
// TODO: FIx fuzzy search
export default function SearchPage({
  blogs,
}: {
  blogs: BlogWithComments[] | [];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: [
        { name: "title", weight: 0.7 },
        {
          name: "tags",
          weight: 0.3,
          getFn: (blog) =>
            blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [],
        },
      ],
      threshold: 0.3, // smaller = stricter match
      includeScore: true,
      ignoreLocation: true,
      shouldSort: true,
      findAllMatches: true,
      useExtendedSearch: true,
    });
  }, [blogs]);

  // Fuzzy filtered results
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBlogs = useMemo(() => {
    if (!query) return [];
    if (query === "all") return blogs;
    const exactMatchQuery = `="${normalizedQuery}"`;

    const results = fuse.search(normalizedQuery); // fuzzy
    const exactMatches = fuse.search(exactMatchQuery); // exact

    // Prioritize exact matches if they exist
    return (exactMatches.length > 0 ? exactMatches : results).map(
      (r) => r.item
    );
  }, [query, fuse, blogs, normalizedQuery]);
  //   add pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handlePrev = () =>
    setCurrentPage((prev: number) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev: number) => Math.min(prev + 1, totalPages));
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8">
      {/* Header section */}
      <div className="py-4 border-b border-border mb-6">
        <h1 className="text-primary/70 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <span>Search results for </span>
          <span className="text-primary truncate">{query.trim()}</span>
        </h1>
      </div>
      <CategoryFilters className="my-8" query={query} />
      {/* search results */}
      {paginatedBlogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((post, index) => (
              <BlogCard key={index} blog={post} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              onClick={handlePrev}
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              className="cursor-pointer items-center">
              <ChevronLeft /> Prev
            </Button>
            <span className="font-semibold text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="cursor-pointer items-center">
              Next <ChevronRight />
            </Button>
          </div>
        </>
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
