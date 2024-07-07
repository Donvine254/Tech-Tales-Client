import { SideNav } from "@/components";
import Slug from "./slug";

export const revalidate = 600;

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
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/blogs"
      : "https://techtales.vercel.app/api/blogs";
  async function fetchBlog() {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: params.slug }),
        next: { revalidate: 600 },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  let blog = await fetchBlog();

  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 md:w-4/5 md:mt-10 font-poppins ">
      <SideNav />
      <Slug blog={blog} />
    </div>
  );
}
