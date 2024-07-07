import prisma from "@/prisma/prisma";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { blog_id } = await req.json();
  const comments = await prisma.comment.findMany({
    where: { blog_id: blog_id },
  });
  if (comments) {
    try {
      const formattedComments = await Promise.all(
        comments.map(async (comment) => {
          const user = await prisma.user.findUnique({
            where: { id: comment.user_id },
            select: {
              avatar: true,
              username: true,
            },
          });

          return {
            id: comment.id.toString(),
            body: comment.body,
            created_at_date: formatDate(comment.created_at),
            author: user.username,
            blog_id: comment.blog_id,
            user_id: user.id.toString(),
            user_avatar: user.avatar,
          };
        })
      );
      return NextResponse.json(formattedComments, { status: 200 });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "An error occurred while fetching blog comments." },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  return NextResponse.json({ comments: [] }, { status: 200 });
}
