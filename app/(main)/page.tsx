import Hero from "@/components/pages/hero";
import prisma from "@/prisma/prisma";
import { BlogWithUser } from "@/types";

export default async function Home() {
  const blog = (await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          username: true,
          picture: true,
        },
      },
    },
    orderBy: {
      views: "desc",
    },
    take: 3,
  })) as BlogWithUser[];
  return (
    <div className="min-h-screen p-2 md:p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-screen max-w-7xl mx-auto">
        <Hero post={blog} />
      </div>
    </div>
  );
}
