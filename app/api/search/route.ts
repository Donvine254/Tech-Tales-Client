import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Fuse from "fuse.js";
import { blogSelect } from "@/prisma/select";
import { tagCategoryMap } from "@/constants";

function expandQuery(query: string): string[] {
  const normalized = query.toLowerCase();
  const category = tagCategoryMap[normalized];
  if (!category) return [normalized]; // no mapping, just return original
  // get all tags that map to this category
  return Object.keys(tagCategoryMap).filter(
    (tag) => tagCategoryMap[tag] === category
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      select: blogSelect,
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: { ttl: 600 },
    });
    if (!query) {
      return NextResponse.json([]);
    }
    if (query === "all") {
      return NextResponse.json(blogs);
    }
    const queries = expandQuery(query);
    // start fuzzy search here
    const fuse = new Fuse(blogs, {
      keys: [
        { name: "title", weight: 0.6 },
        {
          name: "tags",
          weight: 0.4,
          getFn: (blog) =>
            blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [],
        },
      ],
      threshold: 0.4, // smaller = stricter match
      includeScore: true,
      ignoreLocation: true,
      shouldSort: true,
      findAllMatches: true,
      minMatchCharLength: 2,
      distance: 100,
    });
    const results = queries.flatMap((q) =>
      fuse.search(q, { limit: 50 }).map((r) => r.item)
    );
    const unique = Array.from(new Map(results.map((b) => [b.id, b])).values());

    return NextResponse.json(unique);
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 500 });
  }
}
