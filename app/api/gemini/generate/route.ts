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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { prompt } = await req.json();

    const result = await model.generateContentStream(prompt);

    // Create a ReadableStream to handle the chunked response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = await chunk.text(); 
          controller.enqueue(new TextEncoder().encode(chunkText)); 
        }
        controller.close(); 
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 503 }
    );
  }
}
