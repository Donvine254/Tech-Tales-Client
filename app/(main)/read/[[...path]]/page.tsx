import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Slug from "@/components/pages/slug/slug";

async function getData(path: string) {
  "use server";
  try {
    // TODO: Change from slug to blog path
    const blog = await prisma.blog.update({
      where: {
        path: path,
        status: {
          notIn: ["DRAFT", "UNPUBLISHED"],
        },
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
          where: { show: true, status: { not: "ARCHIVED" } },
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
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const pathname = path.join("/");
  const blog = await getData(pathname);
  if (!blog) {
    redirect("/not-found");
  }
  return (
    <section
      className="@container bg-muted dark:bg-background min-h-screen"
      suppressHydrationWarning>
      <Slug blog={blog} />
    </section>
  );
}
