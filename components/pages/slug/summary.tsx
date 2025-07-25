"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogSummaryGeneratorProps {
  title: string;
  blogId: string;
}

const extractPlainTextFromPrintDiv = () => {
  const el = document.getElementById("print-div");
  if (!el) return "";
  return el.textContent?.trim() || "";
};

export default function BlogSummaryGenerator({
  title,
  blogId,
}: BlogSummaryGeneratorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  //fetch from localstorage
  useEffect(() => {
    setContent(extractPlainTextFromPrintDiv());
    const cacheKey = `blog_${blogId}_summary`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setSummary(cached);
    }
  }, [blogId, summary]);
  //   generate summary function
  const handleGenerateSummary = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    if (summary) {
      setIsExpanded(true);
      return;
    }
    setIsGenerating(true);
    setSummary("");
    setError(null);

    try {
      const response = await fetch("/api/gemini/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch {
          errorMessage = (await response.text()) || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullSummary = "";
      try {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim()) {
              if (line.includes(":")) {
                const colonIndex = line.indexOf(":");
                const prefix = line.substring(0, colonIndex);
                const data = line.substring(colonIndex + 1);

                try {
                  const parsedData = JSON.parse(data);

                  switch (prefix) {
                    case "0":
                      if (typeof parsedData === "string") {
                        fullSummary += parsedData;
                        setSummary((prev) => prev + parsedData);
                      } else if (
                        parsedData.type === "text-delta" &&
                        parsedData.textDelta
                      ) {
                        fullSummary += parsedData.textDelta;
                        setSummary((prev) => prev + parsedData.textDelta);
                      }
                      break;
                    case "1":
                      break;
                    case "2":
                      if (parsedData.type === "text" && parsedData.text) {
                        fullSummary += parsedData.text;
                        setSummary((prev) => prev + parsedData.text);
                      }
                      break;
                    case "3":
                      const errorMsg =
                        typeof parsedData === "string"
                          ? parsedData
                          : JSON.stringify(parsedData);
                      throw new Error(`Stream error: ${errorMsg}`);
                    case "e":
                      break;
                    default:
                      break;
                  }
                } catch {
                  if (prefix === "0") {
                    const plain = data.replace(/^"(.*)"$/, "$1");
                    fullSummary += plain;
                    setSummary((prev) => prev + plain);
                  }
                }
              } else {
                setSummary((prev) => prev + line);
                fullSummary += line;
              }
            }
          }
        }

        if (buffer.trim()) {
          fullSummary += buffer;
          setSummary((prev) => prev + buffer);
        }
      } finally {
        reader.releaseLock();
        if (blogId && fullSummary.trim()) {
          localStorage.setItem(`blog_${blogId}_summary`, fullSummary.trim());
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(
        `Sorry, there was an error generating the summary: ${errorMessage}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setError(null);
    setIsGenerating(false);
  };

  return (
    <div
      className={cn(
        isExpanded &&
          "w-full p-3 md:px-5 bg-muted shadow dark:border-border rounded-lg"
      )}>
      <div className="flex items-center justify-between">
        <button
          onClick={handleGenerateSummary}
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 text-xs md:text-sm mt-2 transition-all duration-200 w-full sm:max-w-max",
            isExpanded
              ? "text-green-500 bg-none mb-2"
              : "text-green-500 px-4 py-1 h-9  bg-green-100 dark:bg-green-900/20 border border-green-500 hover:bg-green-500 shadow-xs hover:text-white"
          )}>
          ✨ Generate a summary of this story
        </button>
        {isExpanded && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="hover:text-red-500"
            title="close">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div
        className={`overflow-hidden animate-collapsible ${
          isExpanded
            ? "max-h-[600px] p-2 sm:p-3 rounded-lg bg-card"
            : "max-h-0 p-0"
        }`}>
        <div className="text-sm leading-relaxed mb-2 min-h-[100px]">
          {isGenerating && !summary && !error && (
            <div className="flex items-center gap-2 ">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
              Generating summary...
            </div>
          )}
          {error && (
            <div className="text-red-400 bg-red-900/20 p-3 rounded border border-red-800">
              {error}
              <div className="mt-2 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateSummary}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white text-xs">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {summary && (
            <>
              <div className="whitespace-break-spaces font-serif">
                <h3 className="font-bold md:flex md:items-center text-base md:text-lg mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1rem"
                    height="1rem"
                    className="animate-pulse mr-1 hidden md:inline-block align-middle size-4 ">
                    <path
                      fill="currentColor"
                      d="M11.296 1.924c.24-.656 1.168-.656 1.408 0l.717 1.958a11.25 11.25 0 0 0 6.697 6.697l1.958.717c.657.24.657 1.168 0 1.408l-1.958.717a11.25 11.25 0 0 0-6.697 6.697l-.717 1.958c-.24.657-1.168.657-1.408 0l-.717-1.958a11.25 11.25 0 0 0-6.697-6.697l-1.958-.717c-.656-.24-.656-1.168 0-1.408l1.958-.717a11.25 11.25 0 0 0 6.697-6.697z"></path>
                  </svg>{" "}
                  Here is a fact-based summary of the blog contents:
                </h3>
                <small className="text-xs md:text-sm">{summary}</small>
                {isGenerating && (
                  <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
                )}
              </div>
              {/* <div className="flex items-center justify-center gap-2 border-t border-border py-1 ">
                <p>Was this Helpful?</p>
                <Button variant="ghost" size="icon">
                  <ThumbsUpIcon className="size-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  {" "}
                  <ThumbsDownIcon className="size-4" />
                </Button>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
