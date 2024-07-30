import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const apiKey = process.env.GEMINI_API_KEY as string;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not defined in the environment variables."
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { message, body } = await req.json();

    const result = await model.generateContent([message, body]);
    const response = await result.response.text();
    console.log(response);
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 404 }
    );
  }
}

//how to stream data;
//const result = await model.generateContentStream(prompt);
// for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     console.log(chunkText);
//   }
