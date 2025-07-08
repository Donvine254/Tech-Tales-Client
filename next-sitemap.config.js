/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://techtales.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/api/", "/api", "/me", "/me/*", "/admin", "/sitemap.xml"],
};
