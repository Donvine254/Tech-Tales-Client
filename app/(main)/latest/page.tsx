import React from "react";
import Newsletter from "@/components/pages/newsletter";
import BlogCard from "@/components/pages/blog-card";
import { getLatestBlogs } from "@/lib/actions/blogs";
import FeaturedCard from "@/components/pages/featured-card";
export default async function page() {
  const latestBlogs = await getLatestBlogs();
  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-muted/90 dark:bg-gray-900/90">
      <div className="w-full max-w-7xl mx-auto mb-4">
        <div className="text-center py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="2rem"
                height="2rem">
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
        {/* Featured Card */}
        <hr className="border-3 my-2" />
        <FeaturedCard blog={latestBlogs[0]} />
      </div>
      <section className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs &&
            latestBlogs
              ?.slice(1)
              .map((post, index: number) => (
                <BlogCard key={index} blog={post} />
              ))}
        </div>
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
