import prisma from "./prisma";
import { comments } from "./data";

async function seedDb() {
  console.log("Seeding... ");
  for (let comment of comments) {
    await prisma.comment.create({
      data: comment,
    });
  }
  console.log("Done seeding ✅");
}

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
