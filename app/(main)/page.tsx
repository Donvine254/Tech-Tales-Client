import BlogCard from "@/components/pages/blog-card";
import Hero from "@/components/pages/hero";
import { getBlogs } from "@/lib/actions/blogs";
import prisma from "@/prisma/prisma";
import { BlogWithUser } from "@/types";

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
      <section className="w-full h-screen max-w-7xl mx-auto">
        <Hero post={blog} />
      </section>
      <section className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Latest Articles
          </h2>
          <button className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts &&
            blogPosts.map((post, index: number) => (
              <BlogCard key={index} blog={post} />
            ))}
        </div>
      </section>
    </div>
  );
}
