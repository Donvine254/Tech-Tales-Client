import prisma from "./prisma";
import { comments, socials } from "./data";
import { updateUserSocials } from "@/lib/updateUserSocials";

const newSocials = {
  platform: "facebook",
  url: "https://www.facebook.com/@shicks.wanjiku",
};

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
  updateUserSocials(2, newSocials)
    .then((updatedUser) => console.log("User updated:", updatedUser))
    .catch((error) => console.error("Update failed:", error));
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
