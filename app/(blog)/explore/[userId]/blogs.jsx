import { BlogsComponent } from "@/components";

export default async function Explore({ blogs }) {
  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <BlogsComponent blogs={blogs} />
    </div>
  );
}
