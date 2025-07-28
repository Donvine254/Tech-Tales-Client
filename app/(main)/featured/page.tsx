import React, { Suspense } from "react";
import { Crown } from "lucide-react";
import { Metadata } from "next";
import Newsletter from "@/components/layout/newsletter";
import { FallBackBlogs } from "@/components/pages/blogs/blog-card-skeletons";
import BlogListPage from "@/components/pages/blogs/blog-list";

export const metadata: Metadata = {
  title: "Featured Stories - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 rounded-full">
                <Crown className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-lg mb-2 md:mb-4 md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
              Featured Articles
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl">
              Discover the most viewed and popular articles on TechTales. These
              posts have captured the attention of our readers.
            </p>
          </div>
        </div>
        <Suspense fallback={<FallBackBlogs />}>
          {" "}
          <BlogListPage page="featured" />
        </Suspense>
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
