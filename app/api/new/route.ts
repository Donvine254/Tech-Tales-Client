import { getSession } from "@/lib/actions/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.userId) {
    return NextResponse.redirect(
      new URL("/login?message=login-required", req.url)
    );
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        authorId: Number(session.userId),
        title: "New Untitled Blog",
        status: "DRAFT",
      },
    });
    return NextResponse.redirect(new URL(`/posts/new/${blog.uuid}`, req.url));
  } catch (error) {
    const e = error as Error;
    console.error(e);
    return NextResponse.redirect(
      new URL(`/?error=${e.message.trim()}`, req.url)
    );
  }
}
