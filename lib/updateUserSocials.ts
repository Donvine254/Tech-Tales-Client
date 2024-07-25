import prisma from "@/prisma/prisma";
export async function updateUserSocials(
  userId: number,
  newSocials: { platform: string; url: string }[]
) {
  try {
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

    // Update the map with new socials
    newSocials.forEach((social) =>
      existingSocialsMap.set(social.platform, social.url)
    );

    // Convert the map back to an array
    const updatedSocials = Array.from(
      existingSocialsMap,
      ([platform, url]) => ({
        platform,
        url,
      })
    );
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        socials: updatedSocials,
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

// Example usage
