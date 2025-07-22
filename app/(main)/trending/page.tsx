import { Suspense } from "react";
import Newsletter from "@/components/layout/newsletter";
import { TrendingUp } from "lucide-react";
import { Metadata } from "next";
import { FallBackBlogs } from "@/components/pages/blogs/blog-card-skeletons";
import TrendingBlogs from "./trending-page";

export const metadata: Metadata = {
  title: "Trending Now | Tech Tales",
  description: "See what stories are capturing the tech world's attention.",
};
export const revalidate = 3600;

export default async function page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
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
        </div>
        {/* Featured Card */}
        <Suspense fallback={<FallBackBlogs />}>
          {" "}
          <TrendingBlogs />
        </Suspense>
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
