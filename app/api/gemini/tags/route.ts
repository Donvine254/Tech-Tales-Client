import { baseUrl } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

//get cached blog tags
const getExistingTags = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/blogs/tags`);
      return res.ok ? await res.json() : [];
    } catch {
      return [];
    }
  },
  ["blog-tags"],
  { revalidate: 300 },
);

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY as string;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not defined in the environment variables.",
      );
    }

    const { title } = await req.json();
    console.log(title);
    const existingTags = await getExistingTags();

    const systemPrompt = `You are a tagging assistant for a blog platform.You will receive a blog title and a list of existing tags already used on the platform.
    Instructions:
    - Generate exactly 4 relevant tags for the given blog title.
    - Prefer reusing tags from the existing tags list if they are a good match.
    - Only create new tags if no existing ones are relevant enough.
    - Always include tags for specific technologies, tools, or frameworks
    mentioned in the title (e.g. "tanstack", "react-router", "nextjs") — do
    not replace them with generic alternatives.
    - Fill remaining tags with broader topic tags (e.g. "javascript", "frontend") only after covering the specific ones.
    - Shorten tags that have short forms (e.g. "artificial intelligence" to "ai).
    - Avoid cliché or vague tags that could apply to almost any blog post, such as "trending", "resources", "future", "innovation", "tools", "best practices". Prefer specific, descriptive tags that reflect the actual topic of the post.
    - Return tags as a single comma-separated string: 'tag1,tag2,tag3,tag4'.
    - No explanation, no introductory text — only the tags.
    - Tags should be lowercase, use hyphens for multi-word tags, max 20
    characters each.`;

    const message = `Blog title: "${title}"\n\nExisting tags: ${
      existingTags.length ? existingTags.join(", ") : "none"
    }`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent([message]);
    const response = await result.response.text();
    console.log(response);
    return NextResponse.json({ message: response.trim() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 503 },
    );
  }
}
