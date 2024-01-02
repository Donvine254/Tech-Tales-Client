import { BlogsComponent } from "@/components";
export const revalidate = true;
export default async function Featured() {
  let blogs = await fetch("https://techtales.up.railway.app/featured", {
    next: { revalidate: 600 },
  }).then((response) => response.json());

  return (
    <div className="relative md:min-h-[320px]">
      <BlogsComponent blogs={blogs} />
    </div>
  );
}
