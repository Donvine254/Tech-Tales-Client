// app/api/location/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const ip = searchParams.get("ip");

	if (!ip) {
		return NextResponse.json({ location: "" });
	}
	if (
		ip.startsWith("127.") ||
		ip.startsWith("192.168.") ||
		ip.startsWith("10.") ||
		ip.startsWith("172.")
	) {
		return NextResponse.json({ location: "Local Network" });
	}
	try {
		const res = await fetch(`http://ip-api.com/json/${ip}`);
		const data = await res.json();
		if (data.status !== "success") {
			return NextResponse.json({ location: "" });
		}

		return NextResponse.json({
			location: `${data.city}, ${data.countryCode}`,
		});
	} catch {
		return NextResponse.json({ location: "" });
	}
}
