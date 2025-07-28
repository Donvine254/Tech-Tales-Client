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
