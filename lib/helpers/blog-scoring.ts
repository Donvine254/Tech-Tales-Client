import prisma from "@/prisma/prisma";

// ---------------------------------------------------------------------------
// Score calculators
// ---------------------------------------------------------------------------
/**
 * Trending score: pure engagement velocity — rises fast, decays over time.
 * score = (favorites * 3 + comments * 2 + views * 0.1) / (hoursSincePost + 2)^1.5
 */
export function calcTrendingScore(
  views: number,
  commentCount: number,
  favoriteCount: number,
  createdAt: Date,
): number {
  const daysSincePost =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const engagement = favoriteCount * 3 + commentCount * 2 + views * 0.1;
  const decay = Math.pow(daysSincePost + 1, 1.5);
  return engagement / decay;
}

/**
 * Featured score: quality-weighted — favors depth and saves over raw views.
 * Tweak the weights here independently from trending.
 * score = (favorites * 5 + comments * 2 + views * 0.05 + reading_time * 0.5) / (daysSincePost + 1)^0.8
 */
export function calcFeaturedScore(
  views: number,
  commentCount: number,
  favoriteCount: number,
  readingTime: number,
  createdAt: Date,
): number {
  const daysSincePost =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const quality =
    favoriteCount * 5 + commentCount * 2 + views * 0.05 + readingTime * 0.5;
  const decay = Math.pow(daysSincePost + 1, 0.8);
  return quality / decay;
}

// ---------------------------------------------------------------------------
// Single-blog update  (call this on view / comment / favorite events)
// ---------------------------------------------------------------------------

export async function recalcBlogScore(blogId: number): Promise<void> {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: {
      id: true,
      views: true,
      createdAt: true,
      reading_time: true,
      _count: { select: { comments: true, Favorite: true } },
    },
  });

  if (!blog) return;

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

  await prisma.blog.update({
    where: { id: blogId },
    data: {
      // Multiply by 1_000_000 to preserve 6 decimal places of precision as Int.
      // Raw scores are small floats (e.g. 0.004521) — * 1000 rounded most to zero.
      trendingScore: Math.round(trending * 1_000_000),
      featuredScore: Math.round(featured * 1_000_000),
    },
  });
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/** Top N trending blogs */
export async function getTrending(limit = 10) {
  return prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { trendingScore: "desc" },
    take: limit,
  });
}

/** Top N featured blogs */
export async function getFeatured(limit = 10) {
  return prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { featuredScore: "desc" },
    take: limit,
  });
}
