import prisma from "./prisma";
import { comments, socials } from "./data";

async function seedDb() {
  console.log("Seeding... ");
  // for (let comment of comments) {
  //   await prisma.comment.create({
  //     data: comment,
  //   });
  // }
  await prisma.user.update({
    where: {
      id: 1,
    },
    data: { socials: socials },
  });
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
