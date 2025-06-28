import React from "react";
import Newsletter from "@/components/pages/newsletter";
import BlogCard from "@/components/pages/blog-card";
import { getFeaturedBlogs } from "@/lib/actions/blogs";
import FeaturedCard from "@/components/pages/featured-card";
import { Crown } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Stories | Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};

export default async function page() {
  const featuredBlogs = await getFeaturedBlogs();
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
          {/* Featured Card */}
          {featuredBlogs && featuredBlogs.length > 0 && featuredBlogs[0] && (
            <FeaturedCard blog={featuredBlogs[0]} variant="featured" />
          )}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs &&
            featuredBlogs?.slice(1).map((post, index: number) => (
              <div key={index} className="relative">
                {index < 4 && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span>#1</span>
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
