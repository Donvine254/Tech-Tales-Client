import { BlogsComponent, Component } from "@/components";

const url = "http://localhost:9292/featured";
export default function Featured() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
