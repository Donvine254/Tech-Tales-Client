import { BlogsComponent, Component } from "@/components";


const url = "https://tech-tales-server.up.railway.app/blogs";


export default function HomePage() {

  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
  
