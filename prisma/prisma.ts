// prisma.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

let prisma;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
prisma = globalForPrisma.prisma;

export default prisma;
