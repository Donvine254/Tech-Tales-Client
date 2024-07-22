import prisma from "@/prisma/prisma";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
// Function to format created_at date for the blog

type DecodedToken = {
  id: string;
  username: string;
  email: string;
  handle: string;
  bio: string;
  password_digest: string;
  status: string;
};

//function to decodeToken
const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedToken;
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  const userData = await getDataFromToken(req);

  if (!userData) {
    return NextResponse.json(
      { error: "Unauthorized request. Token is either missing or expired" },
      { status: 401 }
    );
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(userData.id),
        status: { not: "ARCHIVED" }, // Ensure id is a number
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (blogs) {
      return NextResponse.json(blogs, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "You have not authored any blogs yet" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching blog data." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
