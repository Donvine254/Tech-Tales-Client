import BlogCard from "@/components/pages/blog-card";
import { BlogCarousel } from "@/components/pages/carousel";
import Newsletter from "@/components/pages/newsletter";
import { getBlogs } from "@/lib/actions/blogs";
import prisma from "@/prisma/prisma";
import { BlogWithUser } from "@/types";
import Link from "next/link";

//get featured blogs
const featuredBlogs = await prisma.$queryRaw<BlogWithUser[]>`
  SELECT b.*, json_build_object('username', u.username, 'picture', u.picture) AS author
  FROM "Blog" b
  JOIN "User" u ON b."authorId" = u.id
  WHERE b.status = 'PUBLISHED'
  ORDER BY RANDOM()
  LIMIT 10;
`;
export default async function Home() {
  const blogPosts = await getBlogs();

  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-muted/90 dark:bg-gray-900/90">
      <section className="w-full max-w-7xl mx-auto  mb-4">
        {featuredBlogs && featuredBlogs.length > 0 ? (
          <BlogCarousel posts={featuredBlogs} />
        ) : (
          <p>No featured blogs available.</p>
        )}
      </section>
      <section className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-50">
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
      <Newsletter />
    </div>
  );
}
