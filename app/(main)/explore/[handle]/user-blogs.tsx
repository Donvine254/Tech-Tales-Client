"use client";
import MinimalBlogCard from "@/components/pages/minimal-blog-card";
import { Button } from "@/components/ui/button";
import { BlogWithComments } from "@/types";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";

type Props = {
  blogs: BlogWithComments[];
};
const BLOGS_PER_PAGE = 3;
export default function UserBlogs({ blogs }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  //   function for pagination
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const handlePrev = () =>
    setCurrentPage((prev: number) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev: number) => Math.min(prev + 1, totalPages));
  //   function to sort the order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
    setCurrentPage(1); // Reset to first page when sort order changes
  };

  const paginatedBlogs = useMemo(() => {
    // Sort blogs by createdAt based on sortOrder
    const sorted = [...blogs].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    // Apply pagination to the sorted blogs
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return sorted.slice(start, start + BLOGS_PER_PAGE);
  }, [blogs, currentPage, sortOrder]);

  return (
    <>
      <div className="flex items-center flex-wrap justify-between gap-x-4 mb-4">
        <h2 className="font-bold text-lg md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400">
          Authored Blogs ({blogs.length})
        </h2>
        <Button
          onClick={toggleSortOrder}
          variant="ghost"
          className="hover:bg-blue-500 hover:text-white">
          <ArrowUpDown className="h-4 w-4" />
          <span>
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </span>
        </Button>
      </div>
      <div className="space-y-4">
        {paginatedBlogs && paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <MinimalBlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <div className="py-16 flex flex-col items-center justify-center">
            {/* scouting lens */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="3rem"
              height="3rem"
              className="w-12 h-12 md:h-16 md:w-16 mb-4 text-muted-foreground">
              <path
                fill="currentColor"
                d="M233 147.24L191.43 52.6a6 6 0 0 0-1.25-1.83a30 30 0 0 0-42.42 0A6 6 0 0 0 146 55v27h-36V55a6 6 0 0 0-1.76-4.25a30 30 0 0 0-42.42 0a6 6 0 0 0-1.25 1.83L23 147.24A46 46 0 1 0 110 168V94h36v74a46 46 0 1 0 87-20.76M64 202a34 34 0 1 1 34-34a34 34 0 0 1-34 34m0-80a45.8 45.8 0 0 0-18.55 3.92l29.61-67.38A18 18 0 0 1 98 57.71V137a45.9 45.9 0 0 0-34-15m94-64.28a18 18 0 0 1 22.94.83l29.61 67.37A45.9 45.9 0 0 0 158 137ZM192 202a34 34 0 1 1 34-34a34 34 0 0 1-34 34"></path>
            </svg>
            <h3 className="text-xl md:text-2xl font-semibold">
              Nothing to see here
            </h3>
            <p className="mt-2 max-w-md text-center">
              This user has not authored any blogs yet. Let them cook and check
              back later
            </p>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {blogs && blogs.length > 0 && (
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
      )}
    </>
  );
}
