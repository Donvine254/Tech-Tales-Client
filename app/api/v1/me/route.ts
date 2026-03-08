import { isVerifiedUser } from "@/dal/auth-check";
import { validateApiKey } from "@/lib/actions/apikey";
import prisma from "@/prisma/prisma";
import { revalidateTag, updateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import z from "zod";

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
  // Step 4: Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: {
      password_digest: true,
    },
    include: {
      _count: {
        select: {
          blogs: true,
          comments: true,
          sessions: true,
          apikeys: true,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json(user);
}

//*Route to allow users to update their user information *//
const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  handle: z.string().min(3).max(50).optional(),
  bio: z.string().max(500).nullable().optional(),
  skills: z.string().max(200).nullable().optional(),
  branding: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
    .nullable()
    .optional(),
  picture: z.string().url("Must be a valid URL").nullable().optional(),
  keep_blogs_on_delete: z.boolean().optional(),
  keep_comments_on_delete: z.boolean().optional(),
  preferences: z
    .object({
      cookies: z.boolean().optional(),
      analytics: z.boolean().optional(),
      email_notifications: z.boolean().optional(),
      newsletter_subscription: z.boolean().optional(),
    })
    .optional(),
});
export async function PATCH(req: NextRequest) {
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
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = updateUserSchema.safeParse(body);

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
      { error: "No valid fields provided to update." },
      { status: 400 },
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: parsed.data,
      omit: {
        password_digest: true,
      },
      include: {
        _count: {
          select: {
            blogs: true,
            comments: true,
            sessions: true,
            apikeys: true,
          },
        },
      },
    });
    //revalidate user cache
    updateTag(`user:${userId}:data`);
    revalidateTag(`author-${userId}:data`, "max");
    return NextResponse.json(
      {
        message: "User updated successfully.",
        data: updatedUser,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    // Handle unique constraint violations (username or handle already taken)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      const field = (error as { meta?: { target?: string[] } }).meta
        ?.target?.[0];
      return NextResponse.json(
        { error: `${field ?? "Field"} is already taken.` },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Could not update user." },
      { status: 500 },
    );
  }
}
//* Route to offer guidelines on how to delete or deactivate user account*//
export async function DELETE() {
  return NextResponse.json(
    {
      error: "Account deletion is not available via the API.",
      message: "To delete your account, please visit your security settings.",
      url: "/me/settings#security",
    },
    { status: 403 },
  );
}
