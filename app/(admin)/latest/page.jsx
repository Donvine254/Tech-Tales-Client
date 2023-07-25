import { BlogsComponent, Component } from "@/components";

const url = "http://localhost:9292/latest";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
