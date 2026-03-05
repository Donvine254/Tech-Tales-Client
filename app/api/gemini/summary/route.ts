import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
	try {
		const { title, content } = await req.json();

		let systemPrompt = "";
		let userPrompt = "";

		systemPrompt =
			"You are an expert Editorial Strategist. Create a high-density, fact-based summary of the provided blog content. Output MUST be a single paragraph of plain text under 250 words. Do not include introductory phrases like 'This article discusses' or 'The author suggests'; jump immediately into the core insights. Do not repeat the blog title. Focus on the primary thesis, supporting evidence, and final conclusions.";
		userPrompt = `Extract the essential arguments and actionable takeaways from the following content for a comprehensive summary:\n\n${
			title ? `Title: ${title}\n\n` : ""
		}${content}`;

		try {
			// Try with explicit API key configuration
			const result = await streamText({
				model: google("gemini-2.5-flash-lite"),
				system: systemPrompt,
				prompt: userPrompt,
				maxOutputTokens: 400,
				temperature: 0.5,
				onError: (error) => {
					console.error("[SERVER] streamText onError callback:", error);
				},
			});
			return result.toTextStreamResponse();
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
							error: "Invalid API key. Please check your  API Key.",
						}),
						{
							status: 401,
							headers: { "Content-Type": "application/json" },
						},
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
						},
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
						},
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
				},
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
			},
		);
	}
}
