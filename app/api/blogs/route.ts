import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { slugify } from "@/lib";

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
  const blogData = (await req.json()) as Blog;
  const data = {
    ...blogData,
    slug: slugify(blogData.title),
  };
  if (data) {
    try {
      const blog = await prisma.blog.create({
        data: data,
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
      });
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      console.error(error);
      if (error instanceof prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "Invalid blog data. Kindly try again" },
          { status: 422 }
        );
      }

      return NextResponse.json(
        { error: "An error occurred while creating the blog." },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json(
      { error: "Invalid blog data provided" },
      { status: 409 }
    );
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

  let data = await req.json();
  if (data.title) {
    data = { ...data, slug: slugify(data.title) };
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: data,
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
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof prisma.PrismaClientValidationError) {
      return NextResponse.json(
        { error: "Invalid blog data. Kindly try again" },
        { status: 409 }
      );
    }

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
  const role = req.nextUrl.searchParams.get("role");
  if (id) {
    try {
      if (role && role === "admin") {
        await prisma.blog.delete({
          where: {
            id: Number(id),
          },
        });
        return NextResponse.json({}, { status: 200 });
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
  } else {
    return NextResponse.json(
      { error: "Record to delete does not exist." },
      { status: 404 }
    );
  }
}
