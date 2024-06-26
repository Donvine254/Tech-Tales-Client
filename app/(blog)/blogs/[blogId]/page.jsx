import { SideNav } from "@/components";
import Slug from "./slug";

export const revalidate = true;

export const metadata = {
  title: "Blog Page - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};
export async function generateStaticParams() {
  try {
    const response = await fetch("https://techtales.up.railway.app/blogs", {
      next: { revalidate: 600 },
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
    { next: { revalidate: 600 } }
  ).then((response) => response.json());

  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 md:w-2/3 md:mt-10 font-poppins ">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
