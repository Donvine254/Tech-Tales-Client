import { PrismaClient } from "../src/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaPg } from "@prisma/adapter-pg";

// Main client (Accelerate)
const mainClient = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
}).$extends(withAccelerate());

// Replica client using your replica URL via the pg adapter
const replicaAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_REPLICA_URL!,
});
const replicaClient = new PrismaClient({ adapter: replicaAdapter });

// Extend main client with read replicas
const client = mainClient.$extends(
  readReplicas({
    replicas: [replicaClient],
  }),
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
