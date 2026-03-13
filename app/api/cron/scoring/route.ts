import {
  calcFeaturedScore,
  calcTrendingScore,
} from "@/lib/helpers/blog-scoring";
import prisma from "@/prisma/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[scores] Starting bulk recalculation...");
  const start = Date.now();

  const BATCH_SIZE = 100;
  let cursor: number | undefined;
  let succeeded = 0;
  let failed = 0;

  try {
    while (true) {
      const blogs = await prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        select: {
          id: true,
          views: true,
          createdAt: true,
          reading_time: true,
          _count: { select: { comments: true, Favorite: true } },
        },
        take: BATCH_SIZE,
        ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        orderBy: { id: "asc" },
      });

      if (blogs.length === 0) break;

      const results = await Promise.allSettled(
        blogs.map((blog: any) => {
          const trending = calcTrendingScore(
            blog.views,
            blog._count.comments,
            blog._count.Favorite,
            blog.createdAt,
          );
          const featured = calcFeaturedScore(
            blog.views,
            blog._count.comments,
            blog._count.Favorite,
            blog.reading_time,
            blog.createdAt,
          );
          return prisma.blog.update({
            where: { id: blog.id },
            data: {
              trendingScore: Math.round(trending * 1000),
              featuredScore: Math.round(featured * 1000),
            },
          });
        }),
      );

      // Log any failures for investigation without stopping the run
      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          succeeded++;
        } else {
          failed++;
          console.error(
            `[scores] Failed to update blog ${blogs[i].id}:`,
            result.reason,
          );
        }
      });

      cursor = blogs[blogs.length - 1].id;
      console.log(
        `[scores] Batch done. Running total: ${succeeded} succeeded, ${failed} failed...`,
      );
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(
      `[scores] Done in ${elapsed}s. ${succeeded} succeeded, ${failed} failed.`,
    );

    return NextResponse.json({
      ok: true,
      succeeded,
      failed,
      elapsed: `${elapsed}s`,
    });
  } catch (error) {
    console.error("[scores] Recalculation failed:", error);
    return NextResponse.json(
      { error: "Score recalculation failed" },
      { status: 500 },
    );
  }
}
