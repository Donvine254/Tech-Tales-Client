import prisma from "@/prisma/prisma";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type requestData = {
  userId: number;
  newSocial: { platform: string; url: string };
};
export async function PATCH(req: NextRequest) {
  const { userId, newSocial } = (await req.json()) as requestData;
  try {
    // Fetch the current user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { socials: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Record to update not found" },
        { status: 409 }
      );
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
    });

    const token = jwt.sign(updatedUser, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    // Return user details and token
    const response = NextResponse.json(user, { status: 201 });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.error("Error updating user socials:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
