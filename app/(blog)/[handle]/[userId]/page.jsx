import React from "react";
import Explore from "../blogs";
export const revalidate = 600;
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
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
    const userIdsSet = new Set(data.map((blog) => blog.user_id));
    return Array.from(userIdsSet);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}
export default async function Page({ params }) {
  const blogs = await fetch(
    `https://techtales.up.railway.app/blogs/user/${params.userId}`,
    {
      next: { revalidate: 600 },
    }
  ).then((response) => response.json());
  return (
    <section className="md:mt-10">
      <Explore blogs={blogs} />
    </section>
  );
}
