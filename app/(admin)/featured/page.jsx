import { BlogsComponent, Component } from "@/components";

const url = "https://tech-tales.onrender.com/featured";
export default function Featured() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
      <Component />
    </div>
  );
}
