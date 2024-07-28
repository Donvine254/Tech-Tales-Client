// prisma.js
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global;

let prisma;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient().$extends(withAccelerate());
}
prisma = globalForPrisma.prisma;

export default prisma;
