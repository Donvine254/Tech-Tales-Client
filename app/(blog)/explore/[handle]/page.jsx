import React from "react";
import Explore from "./blogs";
import prisma from "@/prisma/prisma";
import { baseUrl } from "@/lib";
export const revalidate = 600;
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
};

export async function generateStaticParams() {
  try {
    // Fetch all blogs
    const blogs = await prisma.blog.findMany();
    const userHandlesSet = new Set();
    for (const blog of blogs) {
      const user = await prisma.user.findUnique({
        where: {
          id: blog.authorId,
        },
      });

      if (user) {
        userHandlesSet.add(user.handle);
      }
    }
    return Array.from(userHandlesSet);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default async function page({ params }) {
  async function fetchBlog() {
    try {
      const response = await fetch(`${baseUrl}/blogs/explore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: params.handle }),
        next: { revalidate: 600 },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  let blogs = await fetchBlog();

  return (
    <section className="md:mt-10">
      <Explore blogs={blogs} />
    </section>
  );
}
