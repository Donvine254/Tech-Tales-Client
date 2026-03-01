"use server";
import prisma from "@/prisma/prisma";
import Fuse from "fuse.js";

type BlogInput = {
  blogId: number;
  tags: string[];
  authorId: number;
  history: number[];
  bookmarks: number[];
};

function normalizeTag(tag: string) {
  return tag.toLowerCase().replace(/[-_]/g, " ").trim();
}

function getNormalizedTags(tagString: string): string[] {
  return tagString.split(",").map(normalizeTag).filter(Boolean);
}

function buildTagHeatmap(tags: string[]): Record<string, number> {
  const heatmap: Record<string, number> = {};
  for (const tag of tags) {
    heatmap[tag] = (heatmap[tag] || 0) + 1;
  }
  return heatmap;
}

function calculateScore({
  blog,
  currentTags,
  tagHeatmap,
  currentAuthorId,
  bookmarks,
  fuse,
}: {
  blog: { id: number; tags: string; authorId: number };
  currentTags: string[];
  tagHeatmap: Record<string, number>;
  currentAuthorId: number;
  bookmarks: number[];
  fuse: Fuse<{ tag: string }>;
}): number {
  const blogTags = getNormalizedTags(blog.tags);

  let score = 0;

  // Fuzzy-match blog tags against history heatmap
  for (const tag of blogTags) {
    const match = fuse.search(tag)[0];
    if (match) {
      const matchedTag = match.item.tag;
      score += (tagHeatmap[matchedTag] || 0) * 2; // weight by frequency
    }
  }

  // Direct tag match with current blog
  const directMatch = blogTags.filter((tag) =>
    currentTags.includes(tag)
  ).length;
  score += directMatch * 3;

  if (blog.authorId === currentAuthorId) {
    score += 5;
  }

  if (bookmarks.includes(blog.id)) {
    score += 10;
  }

  return score;
}
//TODO: We can further enhance this by incorporating more signals like reading time, recency of history blogs, and even user interactions (likes/comments) if available.
// Additionally, we can experiment with different weights and thresholds to fine-tune the recommendations based on user feedback and engagement metrics.
// For guests, we can rely more heavily on tag matching and less on author affinity, while for logged-in users we can leverage their full history and interactions for more personalized recommendations.
// Finally, we can consider implementing a feedback mechanism where users can indicate if they liked a recommendation, which can help us continuously improve the algorithm over time.

export async function recommendBlogs({
  blogId,
  tags,
  authorId,
  history,
  bookmarks,
}: BlogInput): Promise<number[]> {
  const excludeIds = Array.from(new Set([blogId, ...history]));
  const currentTags = tags.map(normalizeTag);
  // Fetch and normalize tags from reading history
  const historyBlogs = await prisma.blog.findMany({
    where: { id: { in: history } },
    select: { tags: true },
  });

  const allHistoryTags = historyBlogs
    .flatMap((b) => getNormalizedTags(b.tags as string))
    .filter(Boolean);

  const tagHeatmap = buildTagHeatmap(allHistoryTags);

  // Fuse instance for fuzzy matching
  const fuse = new Fuse(
    Object.keys(tagHeatmap).map((tag) => ({ tag })),
    {
      keys: ["tag"],
      includeScore: true,
      threshold: 0.3, // adjust sensitivity
    }
  );

  // Fetch candidate blogs
  const candidates = (await prisma.blog.findMany({
    //TODO: For better performance, we can consider implementing a more efficient querying strategy that leverages the database's capabilities, such as using full-text search for tags or precomputing tag vectors for cosine similarity. This way we can reduce the number of candidates we need to score in-memory and improve the overall responsiveness of the recommendations.
    where: {
      id: { notIn: excludeIds },
      status: "PUBLISHED",
    },
    select: { id: true, tags: true, authorId: true },
  })) as { id: number; tags: string; authorId: number }[];

  const scored = candidates
    .map((blog) => ({
      id: blog.id,
      score: calculateScore({
        blog,
        currentTags,
        tagHeatmap,
        currentAuthorId: authorId,
        bookmarks,
        fuse,
      }),
    }))
    .filter((b) => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5
  return scored.map((b) => b.id);
}

// "use server";
// import prisma from "@/prisma/prisma";
// import Fuse from "fuse.js";

// type BlogInput = {
//   blogId: number;
//   tags: string[];
//   authorId: number;
//   history: Array<{ id: number; readAt?: Date }>; // add timestamps
//   bookmarks: number[];
// };

// function normalizeTag(tag: string) {
//   return tag.toLowerCase().replace(/[-_]/g, " ").trim();
// }

// function getNormalizedTags(tagString: string): string[] {
//   return tagString.split(",").map(normalizeTag).filter(Boolean);
// }

// /** Weight recent reads more heavily using exponential decay */
// function buildTagHeatmap(
//   blogs: Array<{ tags: string; readAt?: Date }>
// ): Record<string, number> {
//   const heatmap: Record<string, number> = {};
//   const now = Date.now();
//   const HALF_LIFE_DAYS = 14;

//   for (const blog of blogs) {
//     // Decay weight: 1.0 for just-read, 0.5 after 14 days, 0.25 after 28 days
//     const ageMs = blog.readAt ? now - blog.readAt.getTime() : 0;
//     const ageDays = ageMs / (1000 * 60 * 60 * 24);
//     const decayWeight = Math.pow(0.5, ageDays / HALF_LIFE_DAYS);

//     for (const tag of getNormalizedTags(blog.tags as string)) {
//       heatmap[tag] = (heatmap[tag] || 0) + decayWeight;
//     }
//   }
//   return heatmap;
// }

// function recencyScore(publishedAt: Date): number {
//   const ageDays = (Date.now() - publishedAt.getTime()) / (1000 * 60 * 60 * 24);
//   // Scores ~1.0 for today, ~0.5 at 30 days, approaches 0
//   return 1 / (1 + ageDays / 30);
// }

// function calculateScore({
//   blog,
//   currentTags,
//   tagHeatmap,
//   bookmarkTags,
//   currentAuthorId,
//   fuse,
// }: {
//   blog: { id: number; tags: string; authorId: number; publishedAt: Date; viewCount: number };
//   currentTags: string[];
//   tagHeatmap: Record<string, number>;
//   bookmarkTags: Set<string>;
//   currentAuthorId: number;
//   fuse: Fuse<{ tag: string }>;
// }): number {
//   const blogTags = getNormalizedTags(blog.tags);
//   let score = 0;

//   // 1. History heatmap (fuzzy) — what the user likes to read
//   for (const tag of blogTags) {
//     const match = fuse.search(tag)[0];
//     if (match && match.score !== undefined) {
//       const matchedTag = match.item.tag;
//       const similarity = 1 - match.score; // fuse score: 0=perfect, 1=no match
//       score += (tagHeatmap[matchedTag] || 0) * 2 * similarity;
//     }
//   }

//   // 2. Direct tag overlap with the current blog
//   const directMatches = blogTags.filter((t) => currentTags.includes(t)).length;
//   score += directMatches * 3;

//   // 3. Tag overlap with bookmarked content (interest signal, not the blogs themselves)
//   const bookmarkMatches = blogTags.filter((t) => bookmarkTags.has(t)).length;
//   score += bookmarkMatches * 2;

//   // 4. Same author
//   if (blog.authorId === currentAuthorId) score += 4;

//   // 5. Recency boost (newer = slight preference)
//   score += recencyScore(blog.publishedAt) * 2;

//   // 6. Mild popularity signal (log-scaled to avoid pure popularity bias)
//   if (blog.viewCount > 0) {
//     score += Math.log10(blog.viewCount) * 0.5;
//   }

//   return score;
// }

// export async function recommendBlogs({
//   blogId,
//   tags,
//   authorId,
//   history,
//   bookmarks,
// }: BlogInput): Promise<number[]> {
//   const historyIds = history.map((h) => h.id);
//   const excludeIds = Array.from(new Set([blogId, ...historyIds]));
//   const currentTags = tags.map(normalizeTag);

//   // Fetch history blogs with timestamps
//   const historyBlogs = await prisma.blog.findMany({
//     where: { id: { in: historyIds } },
//     select: { id: true, tags: true },
//   });

//   // Merge readAt timestamps back in
//   const historyWithDates = historyBlogs.map((b) => ({
//     tags: b.tags as string,
//     readAt: history.find((h) => h.id === b.id)?.readAt,
//   }));

//   const tagHeatmap = buildTagHeatmap(historyWithDates);

//   // Build bookmark interest profile
//   const bookmarkedBlogs = await prisma.blog.findMany({
//     where: { id: { in: bookmarks } },
//     select: { tags: true },
//   });
//   const bookmarkTags = new Set(
//     bookmarkedBlogs.flatMap((b) => getNormalizedTags(b.tags as string))
//   );

//   const fuse = new Fuse(
//     Object.keys(tagHeatmap).map((tag) => ({ tag })),
//     {
//       keys: ["tag"],
//       includeScore: true,
//       threshold: 0.2, // tighter — avoids false positives on short tags
//     }
//   );

//   // ✅ Pre-filter at DB level using tag overlap — avoids full table scan
//   const relevantTags = [
//     ...new Set([...currentTags, ...Object.keys(tagHeatmap).slice(0, 20)]),
//   ];

//   const candidates = await prisma.blog.findMany({
//     where: {
//       id: { notIn: excludeIds },
//       status: "PUBLISHED",
//       // Only fetch blogs that share at least one tag — massive perf win
//       OR: relevantTags.map((tag) => ({
//         tags: { contains: tag },
//       })),
//     },
//     select: { id: true, tags: true, authorId: true, publishedAt: true, viewCount: true },
//     take: 200, // cap candidates before in-memory scoring
//   }) as { id: number; tags: string; authorId: number; publishedAt: Date; viewCount: number }[];

//   const scored = candidates
//     .map((blog) => ({
//       id: blog.id,
//       score: calculateScore({ blog, currentTags, tagHeatmap, bookmarkTags, currentAuthorId: authorId, fuse }),
//     }))
//     .filter((b) => b.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, 10);

//   return scored.map((b) => b.id);
// }