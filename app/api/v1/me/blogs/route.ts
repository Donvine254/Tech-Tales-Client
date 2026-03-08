import { isVerifiedUser } from "@/dal/auth-check";
import { validateApiKey } from "@/lib/actions/apikey";
import { baseUrl } from "@/lib/utils";
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
  // Step 1: Try session first
  const sessionUser = await isVerifiedUser().catch(() => null);

  // Step 2: If no session, try API key
  let userId: number | null = sessionUser?.userId ?? null;

  if (!userId) {
    const apiKeyResult = await validateApiKey(req);
    if (apiKeyResult.success && apiKeyResult.data) {
      userId = apiKeyResult.data.userId;
    }
  }

  // Step 3: If neither worked, reject
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid session or API key." },
      { status: 401 },
    );
  }

  // Step 4: Parse and validate query params
  const { searchParams } = new URL(req.url);

  const parsed = blogFiltersSchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
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

  const { page, limit, orderBy, status, from, to } = parsed.data;
  const skip = (page - 1) * limit;

  // Step 5: Build where clause dynamically
  const where = {
    authorId: userId,
    ...(status && { status }),
    ...(from || to
      ? {
          createdAt: {
            ...(from && { gte: new Date(from) }),
            ...(to && { lte: new Date(to) }),
          },
        }
      : {}),
  };

  // Step 6: Query
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
}

// function to create a new blog
const createBlogSchema = z.object({
  title: z.string().min(3).max(200).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  tags: z.string().max(200).nullable().optional(),
  show_comments: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  // Step 1: Try session first
  const sessionUser = await isVerifiedUser().catch(() => null);
  // Step 2: If no session, try API key
  let userId: number | null = sessionUser?.userId ?? null;
  if (!userId) {
    const apiKeyResult = await validateApiKey(req);
    if (apiKeyResult.success && apiKeyResult.data) {
      userId = apiKeyResult.data.userId;
    }
  }
  // Step 3: If neither worked, reject
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid session or API key." },
      { status: 401 },
    );
  }
  // Step 4: Body is optional — user can create a blank blog
  let body: unknown = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = createBlogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Step 5: Create the blog
  const blog = await prisma.blog.create({
    data: {
      authorId: userId,
      title: parsed.data.title ?? "Untitled Blog",
      description: parsed.data.description ?? null,
      tags: parsed.data.tags ?? null,
      show_comments: parsed.data.show_comments,
      status: BlogStatus.DRAFT, // always starts as a draft
    },
    select: blogSelect,
  });

  return NextResponse.json(
    {
      data: blog,
      message: "Blog created. Open the editor to add content.",
      url: `${baseUrl}/posts/new/${blog.uuid}`,
    },
    { status: 201 },
  );
}
