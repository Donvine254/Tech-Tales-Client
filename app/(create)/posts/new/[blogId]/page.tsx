import Script from "next/script";
import Create from "./create";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
import { BlogData, CoverImage } from "@/types";
import { BlogStatus } from "@prisma/client";
import { getSession } from "@/lib/actions/session-utils";
import { z } from "zod";
import { createNewBlog } from "@/lib/actions/blogs";

const uuidSchema = z.string().uuid();

type BlogWithAuthor = {
  uuid: string;
  status: BlogStatus;
  title: string | null;
  body: string | null;
  slug: string | null;
  tags: string | null;
  path: string | null;
  show_comments: boolean;
  description: string | null;
  image: Partial<{
    secure_url: string;
    public_id: string;
  }>;
  audio: string | null;
  author: {
    id: number;
    handle: string;
    picture: string;
    username: string;
  };
};

export default async function page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  // validate UUID format with zod before any database work
  const parsed = uuidSchema.safeParse(blogId);
  if (!parsed.success) {
    redirect("/404?error=invalid-blog-id");
  }

  const session = await getSession();
  if (!session) {
    redirect("/404");
  }

  let blog = (await prisma.blog.findUnique({
    where: { uuid: blogId },
    select: {
      uuid: true,
      status: true,
      title: true,
      body: true,
      slug: true,
      tags: true,
      image: true,
      audio: true,
      path: true,
      show_comments: true,
      description: true,
      author: {
        select: {
          id: true,
          handle: true,
          username: true,
          picture: true,
        },
      },
    },
  })) as BlogWithAuthor | null;

  if (blog && blog.author.id !== session.userId && session.role !== "admin") {
    redirect("/401?error=unauthorized-request");
  }

  if (!blog) {
    const res = await createNewBlog(blogId);
    if (res.success && res.data) {
      blog = res.data as unknown as BlogWithAuthor;
    } else {
      redirect("/401?error=unable-to-create-blog");
    }
  }

  const { image, uuid, status, author, ...rest } = blog as BlogWithAuthor;
  const blogData: BlogData = {
    ...rest,
    image: (image ?? { secure_url: "", public_id: "" }) as CoverImage,
  };

  return (
    <div className="min-h-screen bg-muted">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <Create
        initialData={blogData}
        uuid={uuid}
        status={status}
        author={author}
      />
    </div>
  );
}
