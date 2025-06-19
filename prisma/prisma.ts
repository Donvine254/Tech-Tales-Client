import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export default prisma;