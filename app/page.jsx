import { BlogsComponent } from "@/components";

const url = "https://techtales.up.railway.app/blogs";
export default function Page() {
  return (
    <section className="relative">
      <BlogsComponent blogsUrl={url} />
    </section>
  );
}
