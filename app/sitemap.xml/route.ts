// app/blogs/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET() {
  const baseUrl = "https://techtales.vercel.app";
  const blogs = await prisma.blog.findMany();

  const blogEntries = blogs
    .map(
      (blog) => `
    <url>
      <loc>${baseUrl}/blog/${blog.slug}</loc>
      <lastmod>${new Date(blog.updatedAt!).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${blogEntries}
    </urlset>`;

  return new NextResponse(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
