import { isVerifiedUser } from "@/dal/auth-check";
import { validateApiKey } from "@/lib/actions/apikey";
import { createBlogVersion } from "@/lib/actions/blog-version";
import { revalidateBlog } from "@/lib/actions/cache";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { Prisma } from "@/src/generated/prisma/client";
import { BlogStatus } from "@/src/generated/prisma/enums";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//*Function to get one user blog based on id*//
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const blogId = Number(id);
  if (!id) {
    return NextResponse.json({ message: "Missing blog id" }, { status: 404 });
  }
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { ...blogSelect, body: true },
    });
    return NextResponse.json({ data: blog });
  } catch (error) {
    return NextResponse.json(
      {
        data: [],
        error,
        message: "Could not retrive requested data",
      },
      { status: 500 },
    );
  }
}

//*Function to update blogs belonging to a user*//
const ALLOWED_TRANSITIONS: Record<BlogStatus, BlogStatus[]> = {
  PUBLISHED: [BlogStatus.UNPUBLISHED, BlogStatus.ARCHIVED],
  UNPUBLISHED: [BlogStatus.DRAFT, BlogStatus.ARCHIVED],
  DRAFT: [], // DRAFT can only be published via the editor
  ARCHIVED: [], // terminal state
};
const updateBlogSchema = z.object({
  description: z.string().max(500).nullable().optional(),
  tags: z.string().max(200).nullable().optional(),
  show_comments: z.boolean().optional(),
  audio: z.string().url("Must be a valid URL").nullable().optional(),
  status: z.nativeEnum(BlogStatus).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const blogId = Number(id);

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

  // Step 4: Parse body
  let body: unknown = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = updateBlogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json(
      { error: "At least one field must be provided." },
      { status: 400 },
    );
  }

  // Step 5: Ensure blog exists and belongs to user
  const blog = await prisma.blog.findFirst({
    where: { id: blogId, authorId: userId },
    select: {
      id: true,
      status: true,
      path: true,
      description: true,
      tags: true,
      show_comments: true,
      audio: true,
    },
  });

  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  // Step 6: Prevent updates on archived blogs
  if (blog.status === BlogStatus.ARCHIVED) {
    return NextResponse.json(
      { error: "Archived blogs cannot be updated." },
      { status: 403 },
    );
  }

  // Step 7: Validate status transition if status is being changed
  if (parsed.data.status && parsed.data.status !== blog.status) {
    const allowedTransitions = ALLOWED_TRANSITIONS[blog.status];

    if (!allowedTransitions.includes(parsed.data.status)) {
      return NextResponse.json(
        {
          error: `Cannot transition blog from '${blog.status}' to '${parsed.data.status}'.`,
          allowed: allowedTransitions.length
            ? allowedTransitions
            : "No transitions allowed from this status.",
        },
        { status: 403 },
      );
    }
  }

  // Step 8: Build version note from changed fields
  const changes: string[] = [];
  if (parsed.data.description && parsed.data.description !== blog.description)
    changes.push("description");
  if (parsed.data.tags && parsed.data.tags !== blog.tags) changes.push("tags");
  if (
    parsed.data.show_comments !== undefined &&
    parsed.data.show_comments !== blog.show_comments
  )
    changes.push(`show_comments → ${parsed.data.show_comments}`);
  if (parsed.data.audio !== undefined && parsed.data.audio !== blog.audio)
    changes.push("audio");
  if (parsed.data.status && parsed.data.status !== blog.status)
    changes.push(`status → ${blog.status} to ${parsed.data.status}`);

  const versionNote =
    changes.length > 0
      ? `Updated via API: ${changes.join(", ")}.`
      : "Updated via API. No detectable field changes.";

  // Step 9: Update
  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId, authorId: userId },
      data: parsed.data,
      select: blogSelect,
    });

    revalidateBlog(blog.path, userId);
    setImmediate(() => {
      createBlogVersion(blog.id, versionNote);
    });

    return NextResponse.json({
      data: updatedBlog,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Blog not found." }, { status: 404 });
      }
    }
    console.error(error);
    return NextResponse.json(
      { error: "Could not update blog." },
      { status: 500 },
    );
  }
}

//*Function to delete blogs belonging to a user*//
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const blogId = Number(id);

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

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: blogId, authorId: userId },
      select: {
        status: true,
        path: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    // DRAFT only — permanently deleted
    if (blog.status === "DRAFT") {
      await prisma.blog.delete({
        where: { id: blogId, authorId: userId },
      });
      revalidateTag(`user-${userId}-blogs`, "max");
      return NextResponse.json(
        { message: "Blog deleted successfully." },
        { status: 200 },
      );
    }

    // PUBLISHED or UNPUBLISHED — archived to preserve comments
    if (blog.status === "PUBLISHED" || blog.status === "UNPUBLISHED") {
      await prisma.blog.update({
        where: { id: blogId, authorId: userId },
        data: { status: "ARCHIVED" },
      });
      revalidateBlog(blog.path, userId);
      revalidateTag(`user-${userId}-blogs`, "max");
      return NextResponse.json(
        {
          message:
            "Blog archived successfully. Published blogs cannot be permanently deleted.",
        },
        { status: 200 },
      );
    }

    // ARCHIVED — no action permitted
    if (blog.status === "ARCHIVED") {
      return NextResponse.json(
        {
          error:
            "Archived blogs cannot be deleted. Please manually delete them in your user profile.",
        },
        { status: 403 },
      );
    }

    // Fallback — unknown status
    return NextResponse.json(
      { error: `No action taken for blog with status '${blog.status}'.` },
      { status: 400 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Blog not found." }, { status: 404 });
      }
    }
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred when deleting blog." },
      { status: 500 },
    );
  }
}
