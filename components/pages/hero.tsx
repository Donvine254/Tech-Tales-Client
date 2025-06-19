import { BlogWithUser } from "@/types";
import BlogHero from "./blog-hero";
import HeroCard from "./hero-card";

export default function Hero({ post }: { post: BlogWithUser }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Left: BlogHero takes full height of right column */}
      <div className="lg:col-span-2">
        <BlogHero post={post} />
      </div>

      {/* Right: Stack two HeroCards vertically */}
      <div className="space-y-6">
        <HeroCard post={post} />
        <HeroCard post={post} />
      </div>
    </div>
  );
}
