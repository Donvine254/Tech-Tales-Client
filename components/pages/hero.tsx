import { BlogWithUser } from "@/types";
import { BlogCarousel } from "./carousel";

export default function Hero({ posts }: { posts: BlogWithUser[] }) {
  return (
    <section>
      <BlogCarousel posts={posts} />
    </section>
  );
}
