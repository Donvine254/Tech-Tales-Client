import { decodeUserToken } from "@/lib/decodeToken";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

//function to get a blog by id
export async function GET(req: NextRequest, { params }) {
  const { blogId } = params;
  try {
    const blogs = await prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            branding: true,
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

//function to update blogs
export async function PATCH(req: NextRequest, { params }) {
  const { blogId } = params;
  if (!blogId) {
    return NextResponse.json(
      { error: "Record to update not found" },
      { status: 409 }
    );
  }

  const { title, slug, body, image, tags, status, views, likes } =
    await req.json();
  console.log(req.json());

  try {
    await prisma.blog.update({
      where: {
        id: Number(blogId),
      },
      data: {
        title,
        slug,
        body,
        image,
        tags,
        status,
        views,
        likes,
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
export async function DELETE(req: NextRequest, { params }) {
  const { blogId } = params;
  if (!blogId) {
    return NextResponse.json(
      { error: "Record to delete not found" },
      { status: 409 }
    );
  }
  const user = await decodeUserToken(req);
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
          id: Number(blogId),
        },
      });
      return NextResponse.json(
        { message: "Deleted successfully" },
        { status: 200 }
      );
    } else {
      await prisma.blog.update({
        where: {
          id: Number(blogId),
        },
        data: {
          status: "ARCHIVED",
        },
      });
      return NextResponse.json({});
    }
  } catch (error) {
    console.error("Error deleting blog", error);
    return NextResponse.json(
      { error: "Record to delete does not exist." },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
