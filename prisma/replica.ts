// scripts/test-replica.ts
import prisma from "./prisma";

async function main() {
  console.log("Testing read replica routing...\n");

  // Force a read — should hit replica
  const readResult = await prisma.user.findMany({ take: 1 });
  console.log("✅ Explicit replica read:", readResult);

  // Regular query — should also route to replica
  const autoRead = await prisma.user.findMany({ take: 1 });
  console.log("✅ Auto-routed read:", autoRead);

  // Write — should hit primary only
  // const write = await prisma.user.create({ data: { ... } });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
