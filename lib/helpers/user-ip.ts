"use server";

import { headers } from "next/headers";

// In development, real proxy headers don't exist so we just return localhost
const isDev = process.env.NODE_ENV === "development";

export async function getClientIP(): Promise<string> {
  if (isDev) return "127.0.0.1";

  const headersList = await headers();

  const ipHeaders = [
    "cf-connecting-ip",      // Cloudflare — most trustworthy if you use it
    "x-real-ip",             // Nginx
    "x-forwarded-for",       // Standard proxy header (may contain a list)
    "x-client-ip",
    "x-cluster-client-ip",
    "forwarded",
  ];

  for (const header of ipHeaders) {
    const value = headersList.get(header);
    if (!value) continue;

    // x-forwarded-for can be "client, proxy1, proxy2" — first is the real client
    const ip = value.split(",")[0].trim();

    if (ip && isValidIP(ip)) return ip;
  }

  return "unknown";
}

function isValidIP(ip: string): boolean {
  if (!ip || ip.toLowerCase() === "unknown") return false;

  // IPv4
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6
  const ipv6 = /^[\da-f:]+$/i;

  return ipv4.test(ip) || ipv6.test(ip);
}