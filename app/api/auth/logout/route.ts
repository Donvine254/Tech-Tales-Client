import { type NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/actions/session-utils";

export async function GET(req: NextRequest) {
	await deleteSession();
	const response = NextResponse.redirect(new URL("/login", req.url));
	return response;
}
