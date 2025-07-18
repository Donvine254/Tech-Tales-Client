import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  // allow global prisma across hot reloads in dev
  var prisma: ReturnType<PrismaClient["$extends"]> | undefined;
}

const client = new PrismaClient().$extends(withAccelerate());

const prisma = globalThis.prisma ?? client;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
