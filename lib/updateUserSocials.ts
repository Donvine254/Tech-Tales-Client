"use server";

import prisma from "@/prisma/prisma";

export async function updateUserSocials(
  userId: number,
  newSocial: { platform: string; url: string }
) {
  try {
    // Fetch the current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { socials: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Create a map for existing socials
    const existingSocialsMap = new Map<string, string>();
    (user.socials || []).forEach((social: any) =>
      existingSocialsMap.set(social.platform, social.url)
    );

    // Update the map with the new social media
    existingSocialsMap.set(newSocial.platform, newSocial.url);

    // Convert the map back to an array
    const updatedSocials = Array.from(
      existingSocialsMap,
      ([platform, url]) => ({
        platform,
        url,
      })
    );

    // Update the user with the new social media data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        socials: updatedSocials,
      },
      select: {
        id: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user socials:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
