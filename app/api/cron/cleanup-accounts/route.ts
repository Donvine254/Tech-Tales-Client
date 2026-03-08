// app/api/cron/cleanup-accounts/route.ts
import { DELETED_USER_ID } from "@/lib/utils";
import prisma from "@/prisma/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel cron and not a random caller
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find all accounts deactivated more than 30 days ago
    const expiredAccounts = await prisma.user.findMany({
      where: {
        deactivated: true,
        deactivatedAt: { lt: thirtyDaysAgo },
      },
      select: {
        id: true,
        email: true,
        username: true,
        keep_blogs_on_delete: true,
        keep_comments_on_delete: true,
      },
    });

    if (expiredAccounts.length === 0) {
      return NextResponse.json({ message: "No expired accounts found" });
    }

    // Process each account using the same logic as deleteUserAccount
    const results = await Promise.allSettled(
      expiredAccounts.map(async (user) => {
        await Promise.all([
          user.keep_blogs_on_delete
            ? prisma.blog.updateMany({
                where: { authorId: user.id },
                data: { authorId: DELETED_USER_ID },
              })
            : prisma.blog.deleteMany({ where: { authorId: user.id } }),
          user.keep_comments_on_delete
            ? prisma.comment.updateMany({
                where: { authorId: user.id },
                data: { authorId: DELETED_USER_ID },
              })
            : prisma.comment.deleteMany({ where: { authorId: user.id } }),
        ]);

        await prisma.$transaction([
          prisma.verification.deleteMany({ where: { identifier: user.email } }),
          prisma.user.delete({ where: { id: user.id } }),
        ]);
      }),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    // Log failures for investigation
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
