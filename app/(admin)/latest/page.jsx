import { BlogsComponent, Component } from "@/components";

const url = "https://tech-tales-server.up.railway.app/latest";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
     <Component/>
    </div>
  );
}
