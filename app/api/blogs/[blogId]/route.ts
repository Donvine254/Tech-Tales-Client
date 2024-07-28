import { decodeUserToken } from "@/lib/decodeToken";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

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
  const user = await decodeUserToken(req);
  if (!blogId) {
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
          id: Number(blogId),
        },
      });
      return NextResponse.json({}, { status: 204 });
    } else {
      await prisma.blog.update({
        where: {
          id: Number(blogId),
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
