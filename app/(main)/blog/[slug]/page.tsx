import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Slug from "@/components/pages/slug/slug";
import { metaobject } from "@/lib/metadata";
import { Metadata } from "next";
import { CoverImage } from "@/types";

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
    // TODO: Change from slug to blog path
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getData(slug);
  if (!blog) {
    return {
      ...metaobject,
      title: "Blog Post Not Found - Tech Tales",
      description: "The requested blog post could not be found.",
    };
  }
  const plainTextBody = blog?.body?.replace(/<[^>]*>/g, "") ?? "";
  const description = `${plainTextBody.slice(0, 150)}... Read More`;
  const image = blog.image as CoverImage;
  return {
    ...metaobject,
    title: `${blog.title} - Tech Tales`,
    description,
    keywords: blog.tags?.split(",") ?? metaobject.keywords,
    creator: blog.author.username,
    authors: [
      {
        name: blog.author.username,
        url: `https://techtales.vercel.app/explore/${blog.author.handle}`,
      },
    ],
    openGraph: {
      ...metaobject.openGraph,
      title: `${blog.title} - Tech Tales`,
      description,
      url: `https://techtales.vercel.app/blog/${blog.slug}`,

      images: [
        {
          url: image?.secure_url || "https://techtales.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: blog.title ?? "Tech Tales",
        },
      ],
    },
    twitter: {
      ...metaobject.twitter,
      title: `${blog.title} - Tech Tales`,
      description,
      images: [image.secure_url || "https://techtales.vercel.app/logo.png"],
    },
  } satisfies Metadata;
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
      className="@container bg-muted dark:bg-background min-h-screen"
      suppressHydrationWarning>
      <Slug blog={blog} />
    </section>
  );
}
