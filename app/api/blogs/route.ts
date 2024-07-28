import { decodeUserToken } from "@/lib/decodeToken";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Blog = {
  authorId: number;
  title: string;
  body: string;
  slug?: string;
  image?: string;
  tags?: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
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
      cacheStrategy: { ttl: 60 },
    });

    // Format blogs data if needed

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching blogs." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { authorId, title, image, slug, body, tags } =
    (await req.json()) as Blog;

  try {
    await prisma.blog.create({
      data: {
        authorId,
        title,
        image,
        slug,
        body,
        tags,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "A blog with similar title exists, kindly choose a different title!",
        },
        { status: 409 }
      );
    } else
      return NextResponse.json(
        { error: "An error occurred while creating the blog." },
        { status: 500 }
      );
  } finally {
    await prisma.$disconnect();
  }
}

//function to update blogs
export async function PATCH(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Record to update not found" },
      { status: 409 }
    );
  }

  const { title, slug, body, image, tags, status } = await req.json();
  console.log(req.json());

  try {
    await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        body,
        image,
        tags,
        status,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "A blog with similar title exists, kindly choose a different title!",
        },
        { status: 409 }
      );
    } else
      return NextResponse.json(
        { error: "An error occurred while creating the blog." },
        { status: 500 }
      );
  } finally {
    await prisma.$disconnect();
  }
}

//function to delete blogs. create an admin route where an admin can delete the record completely
export async function DELETE(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  const user = await decodeUserToken(req);
  if (!id) {
    return NextResponse.json(
      { error: "Record to update not found" },
      { status: 409 }
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized Request" },
      { status: 401 }
    );
  }

  try {
    if (user.role === "admin") {
      await prisma.blog.delete({
        where: {
          id: Number(id),
        },
      });
      return NextResponse.json({}, { status: 204 });
    } else {
      await prisma.blog.update({
        where: {
          id: Number(id),
        },
        data: {
          status: "ARCHIVED",
        },
      });
      return NextResponse.json({}, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Record to delete does not exist." },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
