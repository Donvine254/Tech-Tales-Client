import { BlogsComponent, Component } from "@/components";


const url = "http://localhost:9292/blogs";


export default function HomePage() {

  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
  
