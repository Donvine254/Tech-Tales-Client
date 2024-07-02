import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    // Fetch blogs from the database
    const blogs = await prisma.blogs.findMany();

    // Return the blogs as a JSON response
    return NextResponse.json(blogs);
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching blogs." },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
