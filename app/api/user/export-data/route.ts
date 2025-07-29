import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/actions/session";
import prisma from "@/prisma/prisma";
import { PassThrough, Readable } from "stream";
import archiver from "archiver";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.userId) {
    return NextResponse.redirect(
      new URL("/login?message=login-required", req.url)
    );
  }
  try {
    const userId = Number(session.userId);

    const [user, blogs, favorites, comments, responses] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        omit: {
          password_digest: true,
        },
      }),
      prisma.blog.findMany({
        where: { authorId: userId },
        include: { _count: { select: { comments: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.favorite.findMany({
        where: { userId },
      }),
      prisma.comment.findMany({
        where: { authorId: userId },
        include: {
          blog: { select: { title: true, slug: true, tags: true } },
          _count: { select: { responses: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.response.findMany({
        where: { authorId: userId },
        include: {
          comment: {
            select: {
              id: true,
              body: true,
              createdAt: true,
              updatedAt: true,
              blog: { select: { title: true, slug: true, tags: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const archiveStream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(archiveStream);
    archive.append(JSON.stringify(user, null, 2), { name: "profile.json" });
    archive.append(JSON.stringify(blogs, null, 2), { name: "blog_posts.json" });
    archive.append(JSON.stringify(favorites, null, 2), {
      name: "favorites.json",
    });
    archive.append(JSON.stringify(comments, null, 2), {
      name: "comments.json",
    });
    archive.append(JSON.stringify(responses, null, 2), {
      name: "responses.json",
    });
    archive.finalize();
    // eslint-disable-next-line
    const webStream = Readable.toWeb(archiveStream) as any;
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[:.]/g, "-");
    const filename = `techtales-export-${formattedDate}.zip`;
    return new Response(webStream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export failed:", error);
    return new Response("Failed to export data", { status: 500 });
  }
}
