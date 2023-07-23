import { BlogsComponent, Component } from "@/components";

const url = "https://basalt-equatorial-paw.glitch.me/blogs";
export default function Featured() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
