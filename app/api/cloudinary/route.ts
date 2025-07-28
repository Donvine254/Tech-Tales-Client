import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
export async function POST(req: NextRequest) {
  const { public_id } = await req.json();
  console.log(public_id);
  try {
    const apiKey = process.env.CLOUDINARY_API_KEY!;
    const apiSecret = process.env.CLOUDINARY_API_SECRET!;
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
    const signature = sha256(paramsToSign + apiSecret).toString();
    const payload = {
      public_id,
      timestamp,
      api_key: apiKey,
      signature,
    };
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dipkbpinx/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (data.result === "ok") {
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json(data, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete asset" },
      { status: 500 }
    );
  }
}
