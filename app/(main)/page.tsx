import BlogCard from "@/components/pages/blogs/blog-card";
import { BlogCarousel } from "@/components/pages/blogs/carousel";
import CategoryFilters from "@/components/pages/blogs/category-filters";
import Newsletter from "@/components/layout/newsletter";
import { getBlogs } from "@/lib/actions/blogs";
import prisma from "@/prisma/prisma";
import { BlogWithComments, BlogWithUser } from "@/types";

//get featured blogs: 10 random blogs
const featuredBlogs = await prisma.$queryRaw<BlogWithUser[]>`
  SELECT b.*, json_build_object('username', u.username, 'picture', u.picture) AS author
  FROM "Blog" b
  JOIN "User" u ON b."authorId" = u.id
  WHERE b.status = 'PUBLISHED'
  ORDER BY RANDOM()
  LIMIT 10;
`;
export default async function Home() {
  const blogPosts = (await getBlogs()) as BlogWithComments[];

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
        <CategoryFilters className="my-6 md:my-8" />
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
