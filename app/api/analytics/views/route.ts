// app/api/analytics/route.ts
import { updateBlogViews } from "@/lib/actions/analytics";
import { rateLimitByIp } from "@/lib/actions/rate-limiter";
import { getClientIP } from "@/lib/helpers/user-ip";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1. Only accept beacon content-type
  const contentType = req.headers.get("content-type") ?? "";
  if (
    !contentType.includes("text/plain") &&
    !contentType.includes("application/json")
  ) {
    return new Response(null, { status: 415 });
  }

  // 2. Parse and validate
  let body: { blogId: number; trackView: boolean };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 400 });
  }

  const { blogId, trackView } = body;
  if (!blogId || typeof blogId !== "number") {
    return new Response(null, { status: 400 });
  }

  // 3. Rate limit per IP

  const ip = await getClientIP();
  const rateCheck = rateLimitByIp(ip, {
    limit: 30,
    suspensionMinutes: 2,
  });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: rateCheck.message,
        message: "Rate limit exceeded. Try again later",
      },
      { status: 429 },
    );
  }

  // 4. Delegate to your existing server action
  if (trackView) await updateBlogViews(blogId);

  return new Response(null, { status: 204 });
}
