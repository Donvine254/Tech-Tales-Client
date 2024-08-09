import { sendVerificationEmail, sendWelcomeEmail } from "@/emails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, name } = await req.json();
  try {
    const response = await sendWelcomeEmail(email, name);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 404 });
  }
}
