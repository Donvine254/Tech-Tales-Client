import { BlogsComponent, Component } from "@/components";

const url = "https://tech-tales.onrender.com/latest";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
      <Component />
    </div>
  );
}
