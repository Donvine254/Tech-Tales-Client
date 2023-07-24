import { BlogsComponent, Component } from "@/components";

const url = "http://127.0.0.1:9393/featured";
export default function Featured() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
