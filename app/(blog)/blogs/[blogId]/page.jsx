import { SideNav } from "@/components";
import Slug from "./slug";
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const response = await fetch("https://techtales.up.railway.app/blogs", {
      next: { tags: ["collection"] },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    // Extract blog IDs from the data and return as an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: expected an array.");
    }

    const blogIds = data.map((blog) => blog.id);
    return blogIds;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default async function BlogsPage({ params }) {
  let blog = await fetch(
    `https://techtales.up.railway.app/blogs/${params.blogId}`,
    { next: { revalidate: 3600 } }
  ).then((response) => response.json());

  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 md:w-2/3 font-poppins">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
