"use server";

import { headers } from "next/headers";

export async function getClientIP(): Promise<string> {
  const headersList = await headers();

  // Priority order for getting the real IP
  const ipHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip", // Cloudflare
    "x-client-ip",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of ipHeaders) {
    const value = headersList.get(header);
    if (value) {
      const ip = value.split(",")[0]?.trim();
      if (ip && ip.toLowerCase() !== "unknown") {
        return ip;
      }
    }
  }

  // Fallback: fetch from external service
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (res.ok) {
      const data = await res.json();
      if (data?.ip) return data.ip;
    }
  } catch (error) {
    console.error("Failed to fetch fallback IP:", error);
  }

  return "Unknown";
}
