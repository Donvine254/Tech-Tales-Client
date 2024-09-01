import prisma from "./prisma";

// Example usage

async function seedDb() {
  console.log("Seeding... ");
  // for (let comment of comments) {
  //   await prisma.comment.create({
  //     data: comment,
  //   });
  // }
  // await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: { socials: socials },
  // });
  await prisma.user.updateMany({
    data: {
      preferences: {
        cookies: true,
        newsletter_subscription: false,
        email_notifications: false,
        analytics: false,
      },
    },
  });
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
