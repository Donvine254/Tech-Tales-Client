import { rateLimitByIp } from "@/lib/actions/rate-limiter";
import { getClientIP } from "@/lib/helpers/user-ip";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // step-1: check the login attempts
  const ip = await getClientIP();
  const rateCheck = rateLimitByIp(ip, {
    limit: 30,
    suspensionMinutes: 2,
  });
  if (!rateCheck.allowed) {
    NextResponse.json(
      {
        error: rateCheck.message,
        message: "Rate limit exceeded. Try again later",
      },
      { status: 429 },
    );
  }
  //step 2
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
