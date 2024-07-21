import React from "react";
import Explore from "./blogs";
import prisma from "@/prisma/prisma";
import { baseUrl } from "@/lib";
import { Axios } from "axios";
export const revalidate = 600;
export const metadata = {
  title: "Explore Author Blogs - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
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
  const blogs = await Axios.post(`${baseUrl}/blogs/explore`, {
    handle: params.handle,
  });

  return (
    <section className="md:mt-10">
      <Explore blogs={blogs} />
    </section>
  );
}
