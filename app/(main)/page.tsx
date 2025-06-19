import BlogCard from "@/components/pages/blog-card";
import Hero from "@/components/pages/hero";
import { getBlogs } from "@/lib/actions/blogs";
import prisma from "@/prisma/prisma";
import { BlogWithUser } from "@/types";
import Link from "next/link";
export default async function Home() {
  const blog = (await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          username: true,
          picture: true,
        },
      },
    },
    orderBy: {
      views: "desc",
    },
    take: 3,
  })) as BlogWithUser[];
  const blogPosts = await getBlogs();

  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="w-full max-w-7xl mx-auto mb-4">
        <Hero post={blog} />
      </section>
      <section className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Latest Articles
          </h2>
          <Link href="/latest" passHref>
            {" "}
            <button className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors cursor-pointer">
              View All →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts &&
            blogPosts.map((post, index: number) => (
              <BlogCard key={index} blog={post} />
            ))}
        </div>
      </section>
      {/* newsletter section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with TechTales
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles, tutorials, and tech insights delivered
              straight to your inbox. Join over 10,000 developers who trust
              TechTales for quality content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
