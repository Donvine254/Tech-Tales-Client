import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    let systemPrompt = "";
    let userPrompt = "";

    systemPrompt =
      "You are a helpful assistant helping provide summaries for a blog. Create concise, fact-based summaries that capture the key points and main ideas. Focus on accuracy and clarity. Return your response in a single paragraph plain text, limit your words to 350 and do not repeat the title of the blog since the user can already see the it.";
    userPrompt = `Please provide a comprehensive summary of the following content, highlighting the key points, take aways and main ideas:\n\n${
      title ? `Title: ${title}\n\n` : ""
    }${content}`;

    try {
      // Try with explicit API key configuration
      const result = await streamText({
        model: google("gemini-2.5-flash-lite"),
        system: systemPrompt,
        prompt: userPrompt,
        maxTokens: 500,
        temperature: 0.7,
        onError: (error) => {
          console.error("[SERVER] streamText onError callback:", error);
        },
      });
      return result.toDataStreamResponse();
    } catch (aiError) {
      console.error("[SERVER] AI SDK Error details:", {
        message: aiError instanceof Error ? aiError.message : "Unknown error",
        stack: aiError instanceof Error ? aiError.stack : "No stack",
        name: aiError instanceof Error ? aiError.name : "Unknown",
        cause: aiError instanceof Error ? aiError.cause : "No cause",
      });

      // Try to extract more specific error information
      if (aiError instanceof Error) {
        if (
          aiError.message.includes("API_KEY_INVALID") ||
          aiError.message.includes("401")
        ) {
          return new Response(
            JSON.stringify({
              error:
                "Invalid API key. Please check your GOOGLE_GENERATIVE_AI_API_KEY.",
            }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (
          aiError.message.includes("QUOTA_EXCEEDED") ||
          aiError.message.includes("429")
        ) {
          return new Response(
            JSON.stringify({
              error: "API quota exceeded. Please check your billing.",
            }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (
          aiError.message.includes("PERMISSION_DENIED") ||
          aiError.message.includes("403")
        ) {
          return new Response(
            JSON.stringify({
              error: "Permission denied. Check API key permissions.",
            }),
            {
              status: 403,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }

      // Return the actual error message for debugging
      return new Response(
        JSON.stringify({
          error: "AI API Error",
          details:
            aiError instanceof Error ? aiError.message : "Unknown AI error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("[SERVER] Detailed error in generate-summary API:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
