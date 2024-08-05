import { BlogsComponent, SideNav } from "@/components";
export const revalidate = 600;
import { baseUrl } from "@/lib";
export const metadata = {
  title: "Top Blogs - Tech Tales",
};

async function getBlogs() {
  try {
    const res = await fetch(`${baseUrl}/blogs/featured`, {
      next: { revalidate: 360 },
    });
    const blogs = await res.json();
    return blogs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Top() {
  let blogs = (await getBlogs()) || [];

  return (
    <section className="relative md:min-h-[320px] md:mt-10">
      <div className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={blogs} />
      </div>
    </section>
  );
}
