import { BlogsComponent, SideNav } from "@/components";
export const revalidate = 600;

export const metadata = {
  title: "Top Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function Top() {
  let blogs = await fetch("https://techtales.up.railway.app/featured", {
    next: { revalidate: 600 },
  }).then((response) => response.json());

  return (
    <section className="relative md:min-h-[320px] md:mt-10">
      <div className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={blogs} />
      </div>
    </section>
  );
}
