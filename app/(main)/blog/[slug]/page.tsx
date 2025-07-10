import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Slug from "../../../../components/slug/slug";

export async function generateStaticParams() {
  try {
    const slugs = await prisma.blog.findMany({
      where: {
        status: {
          notIn: ["DRAFT", "UNPUBLISHED"],
        },
      },
      select: {
        slug: true,
      },
    });
    const slugArray = slugs.map((slugObj) => ({
      slug: slugObj.slug,
    }));
    return slugArray;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

async function getData(slug: string) {
  "use server";
  try {
    const blog = await prisma.blog.update({
      where: {
        slug: slug,
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
    <section
      className="@container bg-background min-h-screen"
      suppressHydrationWarning>
      <Slug blog={blog} />
    </section>
  );
}
