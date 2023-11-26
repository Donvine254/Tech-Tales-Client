import { BlogsComponent} from "@/components";

const url = "https://techtales.up.railway.app/blogs";

export default function HomePage() {
  return (
    <div className="relative">
      <BlogsComponent blogsUrl={url} />
    </div>
  );
}
