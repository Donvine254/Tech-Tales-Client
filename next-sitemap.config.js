// next-sitemap.config.js
import prisma from './prisma/prisma';

const getBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs.map((blog) => ({
    loc: `https://techtales.vercel.app/blog/${blog.slug}`,
    lastmod: new Date(blog.updatedAt).toISOString(),
    changefreq: "weekly",
    priority: 0.8,
  }));
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://techtales.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/api/", "/api", "/me", "/me/*", "/admin"],
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: config.siteUrl,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 1,
      };
    }

    if (path === "/blogs") {
      const blogEntries = await getBlogs();
      return blogEntries;
    }

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.5,
    };
  },
};
