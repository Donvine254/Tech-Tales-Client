import { BlogsComponent } from "@/components";
export const revalidate = 600;

export const metadata = {
  title: "Relevant Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function Relevant() {
  let blogs = await fetch("https://techtales.up.railway.app/Relevant", {
    next: { revalidate: 600 },
  }).then((response) => response.json());

  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <BlogsComponent blogs={blogs} />
    </div>
  );
}
