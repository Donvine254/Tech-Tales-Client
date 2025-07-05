"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function generateSummary(content: string, title: string) {
  let systemPrompt = "";
  let userPrompt = "";
  systemPrompt =
    "You are a professional summarizer. Create concise, fact-based summaries that capture the key points and main ideas. Focus on accuracy and clarity.";
  userPrompt = `Please provide a comprehensive summary of the following content, highlighting the key points and main ideas:\n\n${
    title ? `Title: ${title}\n\n` : ""
  }${content}`;
  const result = await streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    prompt: userPrompt,
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}
