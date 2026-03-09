import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";
import { NextRequest, NextResponse } from "next/server";

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
    const blog = await prisma.blog.findFirst({
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
