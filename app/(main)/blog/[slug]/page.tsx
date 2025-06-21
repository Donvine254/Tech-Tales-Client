import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Slug from "./slug";
async function getData(slug: string) {
  "use server";
  try {
    const blog = await prisma.blog.update({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
      data: { views: { increment: 1 } },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            handle: true,
            bio: true,
            role: true,
            socials: true,
            branding: true,
          },
        },
        comments: {
          where: {
            status: "VISIBLE",
          },
          include: {
            author: {
              select: {
                username: true,
                picture: true,
                role: true,
                status: true,
              },
            },
            responses: {
              include: {
                author: {
                  select: {
                    username: true,
                    picture: true,
                    role: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return blog;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getData(slug);
  if (!blog) redirect("/not-found");
  return (
    <section className="w-full mx-auto m-2 min-h-[75%] px-8 xsm:px-4 max-w-4xl md:mt-4">
      <Slug blog={blog} />
    </section>
  );
}
