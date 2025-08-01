/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://techtales.vercel.app",
  generateRobotsTxt: true,
  exclude: [
    "/api/*",
    "/api",
    "/login",
    "/register",
    "/checkpoint",
    "/checkpoint/*",
    "/verify-email",
    "/me",
    "/me/*",
    "/posts/new",
    "/posts/new/*",
    "/admin",
    "/admin/*",
    "/sitemap.xml",
  ],
};
