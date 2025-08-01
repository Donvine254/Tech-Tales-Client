import { BlogCarousel } from "@/components/pages/blogs/carousel";
import CategoryFilters from "@/components/pages/blogs/category-filters";
import Newsletter from "@/components/layout/newsletter";
import { getRandomBlogs } from "@/lib/actions/fetcher";
import BlogInfiniteFeed from "@/components/pages/blogs/infinite-feed";

export default async function Home() {
  const featuredBlogs = await getRandomBlogs();
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
        <BlogInfiniteFeed />
      </section>
      {/* newsletter section */}
      <Newsletter />
    </div>
  );
}
