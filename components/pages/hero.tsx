import { Blog } from "@/types";
import BlogHero from "./blog-hero";

export default function Hero({ post }: { post: Blog }) {
  return (
    <div>
      <BlogHero post={post} />
    </div>
  );
}
