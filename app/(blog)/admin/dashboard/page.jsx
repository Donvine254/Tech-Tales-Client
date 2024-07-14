import Dashboard from "./Dashboard";
import { baseUrl } from "@/lib";
import prisma from "@/prisma/prisma";

export async function getTotalCommentsCount() {
  "use server";
  try {
    const comments = await prisma.comments.findMany();
    return comments.length;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
 async function getTotalUsersCount() {
  "use server";
  try {
    const users = await prisma.users.findMany();
    return users.length;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export default async function Page() {
  const blogs = await fetch(`${baseUrl}/blogs`).then((response) =>
    response.json()
  );
  const totalComments = await getTotalCommentsCount();
  const totalUsers = await getTotalUsersCount();
  return (
    <section className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-5/6 md:mt-10 font-poppins">
      <Dashboard
        blogs={blogs}
        totalComments={totalComments}
        totalUsers={totalUsers}
      />
    </section>
  );
}
