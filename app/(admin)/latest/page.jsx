import { BlogsComponent, Component } from "@/components";

const url = "http://127.0.0.1:9393/latest";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
