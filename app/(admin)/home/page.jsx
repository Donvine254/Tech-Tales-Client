import { BlogsComponent, Component } from "@/components";

const url = "https://tech-tales-donvine.koyeb.app/blogs";

export default function HomePage() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
      <Component />
    </div>
  );
}
