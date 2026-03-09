import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";
import { tagCategoryMap } from "@/constants";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  limit: z.coerce.number().min(1).max(50).default(15),
});

function expandQuery(query: string): string[] {
  const normalized = query.toLowerCase();
  const category = tagCategoryMap[normalized];
  if (!category) return [normalized];
  return Object.keys(tagCategoryMap).filter(
    (tag) => tagCategoryMap[tag] === category,
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = searchSchema.safeParse({
    q: searchParams.get("q") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }
  const { q, limit } = parsed.data;
  // No query — return nothing, let the UI handle the empty state
  if (!q) {
    return NextResponse.json({ data: [], meta: { total: 0 } });
  }
  try {
    const queries = expandQuery(q);
    // Pre-filter in Postgres first — only pull blogs that have a chance of
    // matching before handing off to Fuse. This keeps the in-memory set small.
    const candidates = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          // title contains any of the expanded query terms
          ...queries.map((term) => ({
            title: { contains: term, mode: "insensitive" as const },
          })),
          // tags contains any of the expanded query terms
          ...queries.map((term) => ({
            tags: { contains: term, mode: "insensitive" as const },
          })),
        ],
      },
      select: blogSelect,
      orderBy: { createdAt: "desc" },
      // Cap candidates fed into Fuse — no need to fuzzy-match 10k blogs
      take: 200,
    });

    if (candidates.length === 0) {
      return NextResponse.json({ data: [], meta: { total: 0,message:"Please enter a search param in the query paramaters" } });
    }

    // Run Fuse only on the pre-filtered candidate set
    const fuse = new Fuse(candidates, {
      keys: [
        { name: "title", weight: 0.6 },
        {
          name: "tags",
          weight: 0.4,
          getFn: (blog) =>
            blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [],
        },
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      shouldSort: true,
      findAllMatches: true,
      minMatchCharLength: 2,
      distance: 100,
    });

    const results = queries.flatMap((term) =>
      fuse.search(term, { limit }).map((r) => r.item),
    );

    // Deduplicate by id and enforce the limit
    const unique = Array.from(
      new Map(results.map((b) => [b.id, b])).values(),
    ).slice(0, limit);

    return NextResponse.json({
      data: unique,
      meta: { total: unique.length },
    });
  } catch (error) {
    console.error("[GET /api/v1/search]", error);
    return NextResponse.json(
      { error: "Search failed. Please try again later." },
      { status: 500 },
    );
  }
}
