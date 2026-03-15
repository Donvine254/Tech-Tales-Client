// "use client";
// import { updateBlogViews } from "@/lib/actions/analytics";
// import { getCookie, setCookie } from "@/lib/cookie";
// import { useEffect, useState } from "react";

// export default function TrackBlogView({ blogId }: { blogId: number }) {
//   const [shouldTrack, setShouldTrack] = useState(false);
//   // ✅ First effect: start 30s timer and allow tracking if time passes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShouldTrack(true);
//     }, 30000); // 30 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!shouldTrack) return;
//     const history = getCookie("history");
//     let historySet: number[] = [];

//     if (!history) {
//       historySet.push(blogId);
//     } else {
//       try {
//         historySet = JSON.parse(history);
//         if (Array.isArray(historySet) && !historySet.includes(blogId)) {
//           historySet.push(blogId);
//         }
//       } catch (error) {
//         console.error("Error parsing history cookie:", error);
//         // fallback in case cookie was corrupted
//         historySet = [blogId];
//       }
//     }
//     setCookie("history", JSON.stringify(historySet), 30); // Set cookie for 30 days
//     // send view update to db
//     updateBlogViews(blogId).catch((err) => {
//       console.error("Error updating blog view:", err);
//     });
//   }, [blogId, shouldTrack]);

//   return null;
// }

"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/providers/session";

type AnalyticsProps = {
  blogId: number;
  tags: string;
};

type GuestReadEntry = {
  blogId: number;
  tags: string;
  scrollDepth: number;
  timeOnPage: number;
  completed: boolean;
  readAt: string;
};

type GuestHistory = {
  guestId: string;
  reads: GuestReadEntry[];
};

const VIEW_THRESHOLD_MS = 30_000;
const COMPLETED_THRESHOLD = 80;

function getOrCreateGuestId(): string {
  const existing = localStorage.getItem("guest_id");
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem("guest_id", id);
  return id;
}

function getGuestHistory(): GuestHistory {
  try {
    const raw = localStorage.getItem("read_history");
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted — reset
  }
  return { guestId: getOrCreateGuestId(), reads: [] };
}

function saveGuestHistory(history: GuestHistory) {
  localStorage.setItem("read_history", JSON.stringify(history));
}

function updateGuestEntry(
  blogId: number,
  tags: string,
  entry: Omit<GuestReadEntry, "blogId" | "tags" | "readAt">,
) {
  const history = getGuestHistory();
  const existing = history.reads.findIndex((r) => r.blogId === blogId);
  const record: GuestReadEntry = {
    blogId,
    tags,
    ...entry,
    readAt: new Date().toISOString(),
  };
  if (existing >= 0) {
    history.reads[existing] = record;
  } else {
    history.reads.push(record);
  }
  saveGuestHistory(history);
}

export default function BlogAnalytics({ blogId, tags }: AnalyticsProps) {
  const { session } = useSession();

  // All mutable state lives in refs — no re-renders needed;
  const elapsedRef = useRef(0);
  const lastVisibleRef = useRef(Date.now());
  const scrollDepthRef = useRef(0);
  const viewTrackedRef = useRef(false);
  const hasSentRef = useRef(false); // guard against duplicate sends

  useEffect(() => {
    //check for initialization
    if (typeof document === "undefined" || document.hidden) return;

    // Reset all refs on blog change
    elapsedRef.current = 0;
    lastVisibleRef.current = Date.now();
    scrollDepthRef.current = 0;
    viewTrackedRef.current = false;
    hasSentRef.current = false;

    const isLoggedIn = !!session?.userId;

    // ── Helpers ──────────────────────────────────────────────────────────────

    function getTimeOnPage() {
      return Math.round(
        (elapsedRef.current + (Date.now() - lastVisibleRef.current)) / 1000,
      );
    }

    function send() {
      // Guard: only send once per page visit
      if (hasSentRef.current) return;
      hasSentRef.current = true;

      const timeOnPage = getTimeOnPage();
      const scrollDepth = scrollDepthRef.current;
      const completed = scrollDepth >= COMPLETED_THRESHOLD;
      const trackView = viewTrackedRef.current;

      if (isLoggedIn) {
        navigator.sendBeacon(
          "/api/analytics",
          JSON.stringify({
            blogId,
            tags,
            timeOnPage,
            scrollDepth,
            completed,
            trackView,
          }),
        );
      } else {
        // Save rich entry to localStorage for guest recommendations
        updateGuestEntry(blogId, tags, { timeOnPage, scrollDepth, completed });

        // Update history cookie (used by existing recommendation logic)
        if (trackView) {
          navigator.sendBeacon(
            "/api/analytics/view",
            JSON.stringify({ blogId }),
          );
        }
      }
    }

    // ── Listeners ─────────────────────────────────────────────────────────────

    // 1. Count as a view after 30s
    const viewTimer = setTimeout(() => {
      viewTrackedRef.current = true;
    }, VIEW_THRESHOLD_MS);

    // 2. Pause elapsed timer when tab loses focus
    function handleVisibility() {
      if (document.hidden) {
        elapsedRef.current += Date.now() - lastVisibleRef.current;
        send(); // treat tab hide as a leave event
      } else {
        // Reset the send guard on return so a subsequent real leave is captured
        lastVisibleRef.current = Date.now();
        hasSentRef.current = false;
      }
    }

    // 3. Track max scroll depth
    function handleScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const depth = Math.round((scrolled / total) * 100);
      scrollDepthRef.current = Math.max(scrollDepthRef.current, depth);
    }

    // 4. Hard leave (tab close, refresh)
    function handleBeforeUnload() {
      send();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      send(); // Next.js client-side navigation away from page
      clearTimeout(viewTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blogId, session, tags]);

  return null;
}
