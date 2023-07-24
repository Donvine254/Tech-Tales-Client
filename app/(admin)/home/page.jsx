import { BlogsComponent, Component } from "@/components";

const url = "https://basalt-equatorial-paw.glitch.me/blogs";
//fetch the data using the userId

export default function HomePage() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
  
