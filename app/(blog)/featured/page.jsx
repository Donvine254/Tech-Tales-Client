import { BlogsComponent, Component } from "@/components";

const url = "https://techtales.up.railway.app/featured";
export default function Featured() {
  return (
    <div className="relative md:min-h-[320px]">
      <BlogsComponent blogsUrl={url} />
    </div>
  );
}
