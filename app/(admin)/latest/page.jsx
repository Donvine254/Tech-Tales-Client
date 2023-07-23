import { BlogsComponent, Component } from "@/components";

const url = "https://basalt-equatorial-paw.glitch.me/blogs";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
