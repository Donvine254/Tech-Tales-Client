import { BlogsComponent } from "@/components";

const url = "https://techtales.up.railway.app/blogs";
export default function Page() {
  return (
    <section className="relative md:min-h-[350px]">
      <BlogsComponent blogsUrl={url} />
    </section>
  );
}
