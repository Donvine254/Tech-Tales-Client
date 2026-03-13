import Newsletter from "@/components/layout/newsletter";
import { BlogCarousel } from "@/components/pages/blogs/carousel";
import CategoryFilters from "@/components/pages/blogs/category-filters";
import BlogInfiniteFeed from "@/components/pages/blogs/infinite-feed";
import { fetchBlogs, getRandomBlogs } from "@/lib/helpers/blog-fetcher";

export default async function Home() {
  const featuredBlogs = await getRandomBlogs();
  const blogs = await fetchBlogs({ pageParam: 1 });

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
        <CategoryFilters className="my-4 md:my-8" />
        <BlogInfiniteFeed initialData={blogs} />
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
