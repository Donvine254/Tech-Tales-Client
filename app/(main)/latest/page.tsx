import React from "react";
import Newsletter from "@/components/pages/newsletter";
import BlogCard from "@/components/pages/blog-card";
import { getLatestBlogs } from "@/lib/actions/blogs";
import { Clock } from "lucide-react";
import FeaturedCard from "@/components/pages/featured-card";
export default async function page() {
  const latestBlogs = await getLatestBlogs();
  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-muted/90 dark:bg-gray-900/90">
      <div className="w-full max-w-7xl mx-auto mb-4">
        <div className="flex items-center justify-center sm:justify-start gap-2 py-2">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Latest Articles
          </h1>
          <Clock className="h-5 w-5" />
        </div>
        <p className="text-sm sm:text-lg md:text-xl text-primary/90 max-w-4xl">
          Stay up to date with the freshest content from our community of
          developers and tech enthusiasts.{" "}
          <span className="hidden md:inline">
            We bring you the latest insights and trends in the tech world.
          </span>
        </p>
        <hr className="border-3 my-2" />
        <FeaturedCard blog={latestBlogs[0]} />
      </div>
      <section className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs &&
            latestBlogs.map((post, index: number) => (
              <BlogCard key={index} blog={post} />
            ))}
        </div>
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
