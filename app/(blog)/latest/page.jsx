import { BlogsComponent } from "@/components";

const url = "https://techtales.up.railway.app/latest";
// fetch the data based on created time
export default function Latest() {
  return (
    <div className="relative md:min-h-[320px]">
      <BlogsComponent blogsUrl={url} />
    </div>
  );
}