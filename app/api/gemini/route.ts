import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY as string;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not defined in the environment variables."
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const { message, body } = await req.json();

    const result = await model.generateContent([message, body]);
    const response = await result.response.text();
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 503 }
    );
  }
}
