import { BlogsComponent, Component } from "@/components";

const url = "http://127.0.0.1:9393/blogs";
//fetch the data using the userId

export default function HomePage() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
  
