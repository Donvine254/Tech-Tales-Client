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
  likes: number,
  createdAt: Date,
): number {
  const daysSincePost =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const engagement = likes * 3 + commentCount * 2 + views * 0.1;
  const decay = Math.pow(daysSincePost + 1, 1.5);
  return Math.round((engagement / decay) * 100);
}

/**
 * Featured score: quality-weighted — favors depth and saves over raw views.
 * Tweak the weights here independently from trending.
 * score = (favorites * 5 + comments * 2 + views * 0.05 + reading_time * 0.5) / (daysSincePost + 1)^0.8
 */

export function calcFeaturedScore(
  views: number,
  commentCount: number,
  likes: number,
  readingTime: number,
  createdAt: Date,
): number {
  const daysSincePost =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const engagement = likes * 5 + commentCount * 3 + views * 0.1;
  const depthMultiplier = 1 + Math.log1p(readingTime) * 0.1;
  const decay = Math.pow(daysSincePost + 1, 0.8);
  return Math.round(((engagement * depthMultiplier) / decay) * 100);
}
