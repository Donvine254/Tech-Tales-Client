import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { BlogStatus } from "@/src/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const blogFiltersSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(15),
  orderBy: z.enum(["createdAt", "views", "likes"]).default("createdAt"),
  status: z.nativeEnum(BlogStatus).optional(),
  author: z.string().min(2).optional(),
  tags: z.array(z.string().min(1)).optional(),
  from: z
    .string()
    .datetime({ message: "Invalid date format. Use ISO 8601." })
    .optional(),
  to: z
    .string()
    .datetime({ message: "Invalid date format. Use ISO 8601." })
    .optional(),
});

export async function GET(req: NextRequest) {
  // Step 1: Parse and validate query params
  const { searchParams } = new URL(req.url);

  const parsed = blogFiltersSchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    author: searchParams.get("author") ?? undefined,
    tags:
      searchParams.getAll("tags").length > 0
        ? searchParams.getAll("tags")
        : undefined,
    orderBy: searchParams.get("orderBy") ?? undefined,
    status: searchParams.get("status")?.toUpperCase() ?? undefined,
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
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

  const { page, limit, author, tags, orderBy, status, from, to } = parsed.data;
  const skip = (page - 1) * limit;

  const where = {
    status: BlogStatus.PUBLISHED,
    ...(author && {
      author: {
        handle: author,
      },
    }),
    // Each tag in the array must appear somewhere in the tags string
    ...(tags &&
      tags.length > 0 && {
        AND: tags.map((tag) => ({
          tags: {
            contains: tag,
            mode: "insensitive" as const,
          },
        })),
      }),
    ...(from || to
      ? {
          createdAt: {
            ...(from && { gte: new Date(from) }),
            ...(to && { lte: new Date(to) }),
          },
        }
      : {}),
  };

  try {
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        select: blogSelect,
        orderBy: { [orderBy]: "desc" },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      data: blogs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        nextPage: skip + limit < total ? page + 1 : null,
      },
    });
  } catch (error) {
    console.error("[GET /api/v1/blogs]", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs. Please try again later.", error },
      { status: 500 },
    );
  }
}
