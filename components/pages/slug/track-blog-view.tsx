"use client";
import { getCookie, setCookie } from "@/lib/cookie";
import { useEffect } from "react";

export default function TrackBlogView({ blogId }: { blogId: number }) {
  useEffect(() => {
    const history = getCookie("history");
    let historySet: number[] = [];

    if (!history) {
      historySet.push(blogId);
    } else {
      try {
        historySet = JSON.parse(history);
        if (Array.isArray(historySet) && !historySet.includes(blogId)) {
          historySet.push(blogId);
        }
      } catch (error) {
        console.error("Error parsing history cookie:", error);
        // fallback in case cookie was corrupted
        historySet = [blogId];
      }
    }
    setCookie("history", JSON.stringify(historySet), 30); // Set cookie for 30 days
  }, [blogId]);

  return null;
}
