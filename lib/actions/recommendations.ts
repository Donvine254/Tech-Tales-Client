"use server";
import prisma from "@/prisma/prisma";
import Fuse from "fuse.js";

// ── Types ─────────────────────────────────────────────────────────────────────

type BaseBlogInput = {
  blogId: number;
  tags: string;
  authorId: number;
  bookmarks: number[];
};

type LoggedInInput = BaseBlogInput & {
  userId: number;
};

type GuestReadEntry = {
  blogId: number;
  tags: string;
  scrollDepth: number;
  timeOnPage: number;
  completed: boolean;
  readAt: string;
};

type GuestInput = BaseBlogInput & {
  guestHistory: GuestReadEntry[]; // passed from client localStorage
};

type RecommendInput = LoggedInInput | GuestInput;

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeTag(tag: string) {
  return tag.toLowerCase().replace(/[-_]/g, " ").trim();
}

function getNormalizedTags(tagString: string | null | undefined): string[] {
  if (!tagString || typeof tagString !== "string") return [];
  return tagString.split(",").map(normalizeTag).filter(Boolean);
}

function buildTagHeatmap(
  entries: Array<{
    tags: string;
    updatedAt?: Date;
    completed?: boolean;
    scrollDepth?: number | null;
  }>,
): Record<string, number> {
  const heatmap: Record<string, number> = {};
  const now = Date.now();
  const HALF_LIFE_DAYS = 14;

  for (const entry of entries) {
    const date = entry.updatedAt ?? new Date();
    const ageDays = (now - date.getTime()) / (1000 * 60 * 60 * 24);
    const decayWeight = Math.pow(0.5, ageDays / HALF_LIFE_DAYS);

    // Quality multiplier — completed reads count more
    const qualityMultiplier = entry.completed
      ? 2
      : (entry.scrollDepth ?? 0) > 50
        ? 1.5
        : 1;

    for (const tag of getNormalizedTags(entry.tags)) {
      heatmap[tag] = (heatmap[tag] || 0) + decayWeight * qualityMultiplier;
    }
  }
  return heatmap;
}

function recencyScore(publishedAt: Date): number {
  const ageDays = (Date.now() - publishedAt.getTime()) / (1000 * 60 * 60 * 24);
  return 1 / (1 + ageDays / 30);
}

function calculateScore({
  blog,
  currentTags,
  tagHeatmap,
  bookmarkTags,
  currentAuthorId,
  fuse,
}: {
  blog: {
    id: number;
    tags: string;
    authorId: number;
    createdAt: Date;
    views: number;
  };
  currentTags: string[];
  tagHeatmap: Record<string, number>;
  bookmarkTags: Set<string>;
  currentAuthorId: number;
  fuse: Fuse<{ tag: string }>;
}): number {
  const blogTags = getNormalizedTags(blog.tags);
  let score = 0;

  // 1. History heatmap (fuzzy)
  for (const tag of blogTags) {
    const match = fuse.search(tag)[0];
    if (match && match.score !== undefined) {
      const similarity = 1 - match.score;
      score += (tagHeatmap[match.item.tag] || 0) * 2 * similarity;
    }
  }

  // 2. Direct tag overlap with current blog
  score += blogTags.filter((t) => currentTags.includes(t)).length * 3;

  // 3. Bookmark interest signal
  score += blogTags.filter((t) => bookmarkTags.has(t)).length * 2;

  // 4. Same author
  if (blog.authorId === currentAuthorId) score += 4;

  // 5. Recency
  score += recencyScore(blog.createdAt) * 2;

  // 6. Popularity (log-scaled)
  if (blog.views > 0) score += Math.log10(blog.views) * 0.5;

  return score;
}

async function fetchCandidates(
  excludeIds: number[],
  currentTags: string[],
  tagHeatmap: Record<string, number>,
) {
  const relevantTags = [
    ...new Set([...currentTags, ...Object.keys(tagHeatmap).slice(0, 20)]),
  ];

  return prisma.blog.findMany({
    where: {
      id: { notIn: excludeIds },
      status: "PUBLISHED",
      OR: relevantTags.map((tag) => ({ tags: { contains: tag } })),
    },
    select: {
      id: true,
      tags: true,
      authorId: true,
      createdAt: true,
      views: true,
    },
    take: 100,
  }) as Promise<
    {
      id: number;
      tags: string;
      authorId: number;
      createdAt: Date;
      views: number;
    }[]
  >;
}

function scoreAndRank({
  candidates,
  currentTags,
  tagHeatmap,
  bookmarkTags,
  authorId,
}: {
  candidates: {
    id: number;
    tags: string;
    authorId: number;
    createdAt: Date;
    views: number;
  }[];
  currentTags: string[];
  tagHeatmap: Record<string, number>;
  bookmarkTags: Set<string>;
  authorId: number;
}): number[] {
  const fuse = new Fuse(
    Object.keys(tagHeatmap).map((tag) => ({ tag })),
    { keys: ["tag"], includeScore: true, threshold: 0.2 },
  );

  return candidates
    .map((blog) => ({
      id: blog.id,
      score: calculateScore({
        blog,
        currentTags,
        tagHeatmap,
        bookmarkTags,
        currentAuthorId: authorId,
        fuse,
      }),
    }))
    .filter((b) => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((b) => b.id);
}

// ── Logged-in: read history from DB ──────────────────────────────────────────

async function recommendForUser({
  blogId,
  tags,
  authorId,
  userId,
  bookmarks,
}: LoggedInInput): Promise<number[]> {
  const currentTags = getNormalizedTags(tags);

  const [readHistory, bookmarkedBlogs] = await Promise.all([
    prisma.readHistory.findMany({
      where: { userId },
      select: {
        tags: true,
        updatedAt: true,
        completed: true,
        scrollDepth: true,
        blogId: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 50,
    }),
    prisma.favorite.findMany({
      where: { userId, blogId: { in: bookmarks } },
      select: { blog: { select: { tags: true } } },
    }),
  ]);

  const excludeIds = Array.from(
    new Set([blogId, ...readHistory.map((h) => h.blogId)]),
  );

  const tagHeatmap = buildTagHeatmap(
    readHistory.map((h) => ({
      tags: h.tags ?? "",
      updatedAt: h.updatedAt,
      completed: h.completed,
      scrollDepth: h.scrollDepth,
    })),
  );
  const bookmarkTags = new Set(
    bookmarkedBlogs.flatMap((f) => getNormalizedTags(f.blog.tags ?? "")),
  );

  const candidates = await fetchCandidates(excludeIds, currentTags, tagHeatmap);

  return scoreAndRank({
    candidates,
    currentTags,
    tagHeatmap,
    bookmarkTags,
    authorId,
  });
}

// ── Guest: read history from localStorage (passed as param) ──────────────────

async function recommendForGuest({
  blogId,
  tags,
  authorId,

  guestHistory,
}: GuestInput): Promise<number[]> {
  const currentTags = getNormalizedTags(tags);

  const excludeIds = Array.from(
    new Set([blogId, ...guestHistory.map((h) => h.blogId)]),
  );

  const tagHeatmap = buildTagHeatmap(
    guestHistory.map((h) => ({
      tags: h.tags,
      updatedAt: new Date(h.readAt),
      completed: h.completed,
      scrollDepth: h.scrollDepth,
    })),
  );

  // Guests don't have DB bookmarks — derive bookmark tags from guestHistory
  // by treating completed reads as implicit bookmarks
  const bookmarkTags = new Set(
    guestHistory
      .filter((h) => h.completed || h.scrollDepth > 70)
      .flatMap((h) => getNormalizedTags(h.tags)),
  );

  const candidates = await fetchCandidates(excludeIds, currentTags, tagHeatmap);

  return scoreAndRank({
    candidates,
    currentTags,
    tagHeatmap,
    bookmarkTags,
    authorId,
  });
}

// ── Unified entry point ───────────────────────────────────────────────────────

export async function recommendBlogs(input: RecommendInput): Promise<number[]> {
  if ("userId" in input) {
    return recommendForUser(input);
  }
  return recommendForGuest(input);
}
