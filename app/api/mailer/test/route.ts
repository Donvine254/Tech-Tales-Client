import { sendVerificationEmail } from "@/emails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, code } = await req.json();
  try {
    const response = await sendVerificationEmail(email, code);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 404 });
  }
}
