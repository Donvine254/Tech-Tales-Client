import BlogCard from "@/components/pages/blogs/blog-card";
import FeaturedCard from "@/components/pages/blogs/featured-card";
import { baseUrl } from "@/lib/utils";
import { BlogWithComments } from "@/types";
import { Crown } from "lucide-react";

type PageType = "trending" | "latest" | "featured";

interface BlogListPageProps {
  page: PageType;
}

const fieldMap: Record<PageType, "views" | "createdAt" | "likes"> = {
  trending: "views",
  latest: "createdAt",
  featured: "likes",
};

export default async function BlogListPage({ page }: BlogListPageProps) {
  //fetch blogs
  const res = await fetch(
    `${baseUrl}/api/blogs?orderBy=${fieldMap[page]}&limit=10`,
    {
      next: { revalidate: 600, tags: [page] },
    }
  );
  const blogs: BlogWithComments[] = await res.json();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No trending articles available at the moment.
      </div>
    );
  }
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FeaturedCard blog={blogs[0]} variant={page} />
      </section>
      <section className=" border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(1).map((post, index) => (
            <div key={index} className="relative">
              {index < 4 && (
                <div className="absolute -top-2 -right-2 z-20">
                  {page === "featured" ? (
                    <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span>#{index + 2}</span>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-pink-600 to-blue-600 via-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 2}
                    </div>
                  )}
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
