import Script from "next/script";
import Create from "./create";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
import { getSession } from "@/lib/actions/session";
import { BlogData, CoverImage } from "@/types";
import { BlogStatus } from "@prisma/client";

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
  };
};

async function getBlogData(uuid: string) {
  try {
    // TODO: Find why i am not allowing archived blogs to be edited.
    const blog = await prisma.blog.findUnique({
      where: {
        uuid: uuid,
      },
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
          },
        },
      },
    });
    return blog;
  } catch (error) {
    const e = error as Error;
    throw new Error(e.message);
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const session = await getSession();
  // Remember this is the blogUUID not the id
  if (!blogId || !session) {
    redirect("/");
  }
  const blog =
    ((await getBlogData(blogId)) as unknown as BlogWithAuthor) || null;
  if (!blog) {
    redirect("/");
  }
  const { image, uuid, status, author, ...rest } = blog;
  const blogData: BlogData = {
    ...rest,
    image: (image ?? { secure_url: "", public_id: "" }) as CoverImage,
  };
  if (author.id !== session.userId && session.role !== "admin") {
    redirect("/");
  }
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
