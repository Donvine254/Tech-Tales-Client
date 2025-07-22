import BlogCard from "@/components/pages/blogs/blog-card";
import FeaturedCard from "@/components/pages/blogs/featured-card";
import { getTrendingBlogs } from "@/lib/actions/blogs";
import { BlogWithComments } from "@/types";

export default async function TrendingBlogs() {
  const trendingBlogs = (await getTrendingBlogs()) as BlogWithComments[];
  if (!trendingBlogs || trendingBlogs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No trending articles available at the moment.
      </div>
    );
  }
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FeaturedCard blog={trendingBlogs[0]} variant="trending" />
      </section>
      <section className=" border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingBlogs.slice(1).map((post, index) => (
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
    </>
  );
}
