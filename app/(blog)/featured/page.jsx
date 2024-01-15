import { BlogsComponent } from "@/components";
export const revalidate = true;

export const metadata = {
  title: "Featured Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

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
