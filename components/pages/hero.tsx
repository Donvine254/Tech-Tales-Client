import { BlogWithUser } from "@/types";
import BlogHero from "./blog-hero";
import HeroCard from "./hero-card";

export default function Hero({ post }: { post: BlogWithUser[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 max-w-7xl mx-auto">
      {/* Left: BlogHero takes full height of right column */}
      <div className="lg:col-span-2">
        <BlogHero post={post[0]} />
      </div>

      {/* Right: Stack two HeroCards vertically */}
      <div>
        {post.length > 2 &&
          post.slice(1).map((p, index) => <HeroCard key={p.id} post={p} className={index === 1 ? "border-t-2" : ""}/>)}
      </div>
    </div>
  );
}
