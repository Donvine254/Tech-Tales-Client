import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { blogSelect } from "@/prisma/select";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 18;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const orderByField = searchParams.get("orderBy") as
    | "createdAt"
    | "views"
    | "likes"
    | null;

  const limitParam = searchParams.get("limit");
  // Use fallback limit
  const limit = (() => {
    const parsed = parseInt(limitParam ?? "", 10);
    return isNaN(parsed) || parsed <= 0 ? DEFAULT_LIMIT : parsed;
  })();

  const pageParam = searchParams.get("page");
  // use fallback page
  const page = (() => {
    const parsed = parseInt(pageParam ?? "", 10);
    return isNaN(parsed) || parsed < 1 ? DEFAULT_PAGE : parsed;
  })();

  const skip = (page - 1) * limit;

  try {
    const blogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      select: blogSelect,
      ...(orderByField && {
        orderBy: { [orderByField]: "desc" },
      }),
      skip,
      take: limit,
      cacheStrategy: { ttl: 600 },
    });
    const nextPage = blogs.length === limit ? page + 1 : null;
    return NextResponse.json({ blogs, nextPage });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
