import React, { Suspense } from "react";
import Newsletter from "@/components/layout/newsletter";
import { Metadata } from "next";
import { FallBackBlogs } from "@/components/pages/blogs/blog-card-skeletons";
import BlogListPage from "@/components/pages/blogs/blog-list";

export const metadata: Metadata = {
  title: "All latest blogs - Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      {/* header section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width="2rem"
                  height="2rem"
                  className="text-white">
                  <path
                    fill="currentColor"
                    d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6zm8 9v5H8l-1.67-5H5v-2h8v2z"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-lg mb-2 md:mb-4 md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
              Latest Articles
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl">
              Stay up to date with the freshest content from our community of
              developers and tech enthusiasts.
            </p>
          </div>
        </div>
        <Suspense fallback={<FallBackBlogs />}>
          {" "}
          <BlogListPage page="latest" />
        </Suspense>
      </section>

      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
