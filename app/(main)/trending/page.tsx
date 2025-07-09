import React from "react";
import Newsletter from "@/components/pages/newsletter";
import BlogCard from "@/components/pages/blog-card";
import { getTrendingBlogs } from "@/lib/actions/blogs";
import FeaturedCard from "@/components/pages/featured-card";
import { TrendingUp } from "lucide-react";
import { Metadata } from "next";
import { BlogWithComments } from "@/types";

export const metadata: Metadata = {
  title: "Trending Now | Tech Tales",
  description: "See what stories are capturing the tech world's attention.",
};

export default async function page() {
  const trendingBlogs = (await getTrendingBlogs()) as BlogWithComments[];
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-lg mb-2 md:mb-4 md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
              Trending Articles
            </h1>
            <p className="text-sm sm:text-lg mx-auto text-primary/90 max-w-2xl">
              Discover the most loved content by our community. These articles
              are trending based on likes and engagement.
            </p>
          </div>
          {/* Featured Card */}
          <FeaturedCard blog={trendingBlogs[0]} variant="trending" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingBlogs &&
            trendingBlogs?.slice(1).map((post, index: number) => (
              <div key={index} className="relative">
                {index < 4 && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-pink-600 to-blue-600 via-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 2}
                    </div>
                  </div>
                )}
                <BlogCard blog={post} />
              </div>
            ))}
        </div>
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
