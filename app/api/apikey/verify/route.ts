import { validateApiKey } from "@/lib/actions/apikey";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await validateApiKey(req);
  if (!res.success) {
    return NextResponse.json({ error: res.error }, { status: 401 });
  } else return NextResponse.json(res);
}
