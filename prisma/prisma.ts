import { PrismaClient } from "@prisma/client";

declare global {
  // allow global prisma across hot reloads in dev
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
