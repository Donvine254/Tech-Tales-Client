import Script from "next/script";
import Create from "./create";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
import { getSession } from "@/lib/actions/session";
import { BlogData, CoverImage } from "@/types";
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
  const blog = await prisma.blog.findUnique({
    where: { uuid: blogId },
    select: {
      title: true,
      uuid: true,
      body: true,
      slug: true,
      tags: true,
      image: true,
      audio: true,
      authorId: true,
    },
  });
  if (!blog) {
    redirect("/");
  }

  const { authorId, uuid, image, ...rest } = blog;
  const blogData: BlogData = {
    ...rest,
    image: (image ?? { secure_url: "", public_id: "" }) as CoverImage,
  };
  if (authorId !== session.userId && session.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-muted">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <Create initialData={blogData} uuid={uuid} />
    </div>
  );
}
