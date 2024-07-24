import { BlogsComponent, SideNav } from "@/components";
import { baseUrl } from "@/lib";
export const revalidate = 60;

export const metadata = {
  title: "Relevant Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function Relevant() {
  const blogs = await fetch(`${baseUrl}/blogs`, {
    next: { revalidate: 60 },
  }).then((response) => response.json());
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const random = shuffleArray(blogs).slice(0, 5);
  return (
    <div className="relative md:min-h-[320px] md:mt-10">
      <section className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <BlogsComponent blogs={random} />
      </section>
    </div>
  );
}
