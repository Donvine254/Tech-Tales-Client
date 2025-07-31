"use client";
import { updateBlogViews } from "@/lib/actions/analytics";
import { getCookie, setCookie } from "@/lib/cookie";
import { useEffect, useState } from "react";

export default function TrackBlogView({ blogId }: { blogId: number }) {
  const [shouldTrack, setShouldTrack] = useState(false);
  // ✅ First effect: start 30s timer and allow tracking if time passes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldTrack(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldTrack) return;
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
    // send view update to db
    updateBlogViews(blogId).catch((err) => {
      console.error("Error updating blog view:", err);
    });
  }, [blogId, shouldTrack]);

  return null;
}
