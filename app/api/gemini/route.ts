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

    const { message } = await req.json();
    const systemPrompt = `You are an expert blog writer assisting with drafting or editing content for a modern online blog platform. The user may provide a topic, draft, or incomplete idea. Your job is to create or refine the content into well-structured, engaging, and readable HTML blog content.
    
    Instructions:
    - Return clean HTML only (e.g., use <h2>, <p>, <ul>, <li>, etc.).
    - Do not include markdown or code fences.
    - Do not explain or comment on the output—just return the HTML.
    - The tone should be clear, informative, and engaging, depending on the topic.
    - Structure the blog post with a headings, subheadings, paragraphs, and lists if needed.
    - Do not provide a title heading
    - For each code response, wrap it in a pre with a class corresponding to its language, for example class=langauge-javascript, class=language-typescript etc. Short codes that need to be highlighted can just be put into <code> tags.

    Example output format:
    <h2>Heading 1</h2>
    <p>Intro paragraph...</p>
    <h3>Subheading</h3>
    <p>More content...</p>
    <pre class="langauge-javascript"><code> {...code response here}</code></pre>
    Now, generate or edit the blog content based on the following input:`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      systemInstruction: systemPrompt,
    });
    const result = await model.generateContent([message]);
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
