import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { readReplicas } from "@prisma/extension-read-replicas";

const client = new PrismaClient().$extends(withAccelerate()).$extends(
  readReplicas({
    url: process.env.DATABASE_REPLICA_URL as string,
  })
);

type ExtendedPrismaClient = typeof client;

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

const prisma = globalThis.prisma ?? client;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma as ExtendedPrismaClient;
