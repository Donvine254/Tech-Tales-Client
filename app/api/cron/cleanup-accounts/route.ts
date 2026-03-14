// app/api/cron/cleanup-accounts/route.ts
import { DELETED_USER_ID } from "@/lib/utils";
import prisma from "@/prisma/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expiredAccounts = await prisma.user.findMany({
      where: {
        deactivated: true,
        deactivatedAt: { lt: thirtyDaysAgo },
      },
      select: {
        id: true,
        email: true,
        username: true,
        userPreferences: {
          select: {
            // 👈 was missing select
            keep_blogs_on_delete: true,
            keep_comments_on_delete: true,
          },
        },
      },
    });

    if (expiredAccounts.length === 0) {
      return NextResponse.json({ message: "No expired accounts found" });
    }

    const results = await Promise.allSettled(
      expiredAccounts.map(async (user) => {
        // 👇 destructure from userPreferences with safe fallbacks
        const keepBlogs = user.userPreferences?.keep_blogs_on_delete ?? false;
        const keepComments =
          user.userPreferences?.keep_comments_on_delete ?? false;

        await Promise.all([
          keepBlogs
            ? prisma.blog.updateMany({
                where: { authorId: user.id },
                data: { authorId: DELETED_USER_ID },
              })
            : prisma.blog.deleteMany({ where: { authorId: user.id } }),
          keepComments
            ? prisma.comment.updateMany({
                where: { authorId: user.id },
                data: { authorId: DELETED_USER_ID },
              })
            : prisma.comment.deleteMany({ where: { authorId: user.id } }),
        ]);

        // UserPreferences is handled automatically by onDelete: Cascade
        await prisma.$transaction([
          prisma.verification.deleteMany({ where: { identifier: user.email } }),
          prisma.user.delete({ where: { id: user.id } }),
        ]);
      }),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(
          `Failed to delete account ${expiredAccounts[i].email}:`,
          result.reason,
        );
      }
    });

    return NextResponse.json({
      message: `Cleanup complete: ${succeeded} deleted, ${failed} failed`,
      succeeded,
      failed,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
