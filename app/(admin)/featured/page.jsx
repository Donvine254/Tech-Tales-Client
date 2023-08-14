import { BlogsComponent, Component } from "@/components";

const url = "https://tech-tales-server.up.railway.app/featured";
export default function Featured() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
