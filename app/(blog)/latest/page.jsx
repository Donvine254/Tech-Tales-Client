import { BlogsComponent } from "@/components";

export const revalidate = true;
// fetch the data based on created time
export default async function Latest() {
  let blogs = await fetch("https://techtales.up.railway.app/latest", {
    next: { revalidate: 600 },
  }).then((response) => response.json());

  return (
    <div className="relative md:min-h-[320px]">
      <BlogsComponent blogs={blogs} />
    </div>
  );
}
