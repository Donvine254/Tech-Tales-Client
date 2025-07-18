import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const client = new PrismaClient().$extends(withAccelerate());

type ExtendedPrismaClient = typeof client;

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

const prisma = globalThis.prisma ?? client;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma as ExtendedPrismaClient;
