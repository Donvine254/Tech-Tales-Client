import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "node-html-parser";
import { z } from "zod";

const commentsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(15),
});

function stripHtml(html: string): string {
  return parse(html).textContent.trim();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const blogId = Number(id);

  if (isNaN(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID." }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);

  const parsed = commentsSchema.safeParse({
    page: searchParams.get("page") ?? undefined,
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

  const { page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  try {
    // Verify the blog exists and is published
    const blog = await prisma.blog.findFirst({
      where: { id: blogId, status: "PUBLISHED" },
      select: { id: true, show_comments: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    if (!blog.show_comments) {
      return NextResponse.json(
        { error: "Comments are disabled for this blog." },
        { status: 403 },
      );
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          blogId,
          status: "VISIBLE",
          show: true,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              username: true,
              handle: true,
              picture: true,
            },
          },
          responses: {
            where: {
              status: "VISIBLE",
            },
            select: {
              id: true,
              body: true,
              createdAt: true,
              updatedAt: true,
              author: {
                select: {
                  username: true,
                  handle: true,
                  picture: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.comment.count({
        where: { blogId, status: "VISIBLE", show: true },
      }),
    ]);
    // biome-ignore lint/suspicious/noExplicitAny: Prisma query result shape is complex, not worth typing manually
    const sanitized = comments.map((comment: any) => ({
      ...comment,
      body: stripHtml(comment.body),
      responses: comment.responses.map((response: any) => ({
        ...response,
        body: stripHtml(response.body),
      })),
    }));

    return NextResponse.json({
      data: sanitized,
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
    console.error("[GET /api/v1/blogs/[id]/comments]", error);
    return NextResponse.json(
      { error: "Failed to fetch comments. Please try again later." },
      { status: 500 },
    );
  }
}
