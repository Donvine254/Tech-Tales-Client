// app/api/analytics/route.ts
import { isVerifiedUser } from "@/dal/auth-check";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  const { blogId, tags, timeOnPage, scrollDepth, completed, trackView } =
    JSON.parse(await req.text());

  const session = await isVerifiedUser();

  await Promise.all(
    [
      // Upsert read history for logged-in users
      session?.userId &&
        prisma.readHistory.upsert({
          where: {
            userId_blogId: { userId: session.userId, blogId },
          },
          create: {
            userId: session.userId,
            blogId,
            tags,
            timeOnPage,
            scrollDepth,
            completed,
          },
          update: {
            timeOnPage,
            scrollDepth,
            completed: completed ? true : undefined,
          },
        }),

      // Increment view count if threshold was met
      trackView &&
        prisma.blog.update({
          where: { id: blogId },
          data: { views: { increment: 1 } },
        }),
    ].filter(Boolean),
  );

  return new Response(null, { status: 204 });
}
