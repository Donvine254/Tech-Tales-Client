import { PrismaClient } from "../src/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { readReplicas } from "@prisma/extension-read-replicas";
import { PrismaPg } from "@prisma/adapter-pg";

// Primary adapter — your main/pooled connection
const primaryAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
  ssl: { rejectUnauthorized: false },
});

// Replica adapter — direct replica connection
const replicaAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_REPLICA_URL as string,
  ssl: { rejectUnauthorized: false },
});

// Both clients now have adapters
const replicaClient = new PrismaClient({ adapter: replicaAdapter });
const baseClient = new PrismaClient({ adapter: primaryAdapter });
/*[--This version gives more preference to read replicas than the accelerate client for both reads but is slightly slower!!]*/
const client = baseClient
  .$extends(readReplicas({ replicas: [replicaClient] }))
  .$extends(withAccelerate());

type ExtendedPrismaClient = typeof client;

declare global {
  var prisma: ExtendedPrismaClient | undefined;
}
// biome-ignore lint/suspicious/noRedeclare: singleton
const prisma = globalThis.prisma ?? client;
globalThis.prisma = prisma;

export default prisma as ExtendedPrismaClient;

/*[--This version gives more preference to accelerate client for both reads and writes but is faster!!]*/
// import { PrismaClient } from "../src/generated/prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { readReplicas } from "@prisma/extension-read-replicas";
// import { PrismaPg } from "@prisma/adapter-pg";

// // Main client (Accelerate)
// const mainClient = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL as string,
// }).$extends(withAccelerate());

// // Replica client using your replica URL via the pg adapter
// const replicaAdapter = new PrismaPg({
//   connectionString: process.env.DATABASE_REPLICA_URL as string,
// });
// const replicaClient = new PrismaClient({ adapter: replicaAdapter });

// // Extend main client with read replicas
// const client = mainClient.$extends(
//   readReplicas({
//     replicas: [replicaClient],
//   }),
// );

// type ExtendedPrismaClient = typeof client;

// declare global {
//   var prisma: ExtendedPrismaClient | undefined;
// }
// // biome-ignore lint/suspicious/noRedeclare: singleton
// const prisma = globalThis.prisma ?? client;
// globalThis.prisma = prisma;

// export default prisma as ExtendedPrismaClient;
