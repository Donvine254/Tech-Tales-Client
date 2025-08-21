"use client";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/pages/blogs/blog-card";
import CategoryFilters from "@/components/pages/blogs/category-filters";
import { BlogWithComments } from "@/types";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
const BLOGS_PER_PAGE = 6;
// TODO: Add pagination with useQuery
async function fetchBlogs(query: string) {
  const res = await fetch(
    `/api/search?q=${encodeURIComponent(query.toLowerCase())}`
  );
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = (await res.json()) as BlogWithComments[];
  return data;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [], isLoading } = useQuery({
    queryKey: ["searchBlogs", query],
    queryFn: () => fetchBlogs(query),
    enabled: !!query, // don't run if query is empty
    staleTime: 1000 * 60 * 5, // 5 minute cache
  });
  // reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const totalPages = Math.ceil(data?.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return data?.slice(start, start + BLOGS_PER_PAGE);
  }, [data, currentPage]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  if (isLoading) {
    return <Loading />;
  }
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
      {paginatedBlogs && paginatedBlogs.length > 0 ? (
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
