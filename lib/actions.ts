"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { baseUrl } from ".";

export async function revalidateBlogs(slug: string) {
  if (slug) {
    revalidatePath(`/blogs/${slug}`, "page");
  } else {
    revalidatePath("/blogs/[slug]", "layout");
  }
}
export async function revalidatePage(page) {
  revalidatePath(`/${page}`, "page");
}

export async function updateUserRole(id: string | number, role: string) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function deactivateUser(id) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "DEACTIVATED",
        deactivatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserStatus(id: number | string, status: string) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        picture: true,
        handle: true,
        bio: true,
        _count: {
          select: {
            comments: true,
            blogs: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUser(id: number | string) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating user details", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCommentStatus(status: string, id: number | string) {
  try {
    const comment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
            role: true,
          },
        },
        blog: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("an error occurred when updating comment status", error);
  } finally {
    await prisma.$disconnect();
  }
}

//function to get slug blog
export async function getBlogData(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        tags: true,
        image: true,
        body: true,
        authorId: true,
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleBlogLiking(
  id: number | string,
  userId: number | string,
  action: string
) {
  try {
    // Get the current likes count
    if (action === "LIKE") {
      await prisma.blog.update({
        where: {
          id: Number(id),
        },
        data: { likes: { increment: 1 } },
        select: {
          id: true,
        },
      });
      const favorite = await prisma.favorite.create({
        data: { blogId: id, userId: userId },
        select: { id: true, userId: true, blogId: id },
      });
      return favorite;
    } else if (action === "DISLIKE") {
      await prisma.blog.update({
        where: {
          id: Number(id),
        },
        data: { likes: { increment: -1 } },
        select: {
          id: true,
        },
      });
      await prisma.favorite.deleteMany({
        where: {
          blogId: Number(id),
          userId: Number(userId),
        },
      });
      return { disliked: true };
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// added here since imports are bringing errors
type patchData = {
  title?: string;
  body?: string;
  slug?: string;
  image?: string;
  tags?: string;
  status?: string;
  likes?: number;
  views?: number;
};

export async function UpdateBlogData(id: number, data: patchData) {
  if (!id) {
    throw new Error("Record to update not found!");
  }
  try {
    const { title, slug, body, image, tags, status, likes, views } = data;
    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        slug,
        body,
        image,
        tags,
        status,
        likes,
        views,
      },
      select: {
        id: true,
      },
    });
    return { message: "Blog updated successfully" };
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      throw new Error(
        "A blog with similar title exists, kindly choose a different title!"
      );
    } else throw new Error("An error occurred while creating the blog.");
  } finally {
    await prisma.$disconnect();
  }
}

const allowedStatuses = ["PUBLISHED", "ARCHIVED", "UNPUBLISHED"];

export async function UpdateBlogStatus(id: number, status: string) {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status provided!");
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
      include: {
        author: {
          select: {
            username: true,
            picture: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the blog status.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function DeleteBlog(id: number) {
  try {
    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: "Blog has been deleted successfully" };
  } catch (error) {
    throw new Error(error);
  }
}

export async function CheckFavoriteStatus(userId: number, blogId: number) {
  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: userId,
        blogId: blogId,
      },
    });
    if (favorite) return true;
    else return false;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

//function to verify captcha
export async function validateRecaptcha(captcha: string) {
  const secretKey = process.env.GOOGLE_RECAPTCHA_CLIENT_SECRET;

  if (!secretKey) {
    throw new Error("Missing Google reCAPTCHA client secret");
  }

  if (!captcha) {
    throw new Error("Missing reCAPTCHA response token");
  }

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to validate reCAPTCHA response: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.success && data.score < 0.5) {
    throw new Error("Failed reCAPTCHA validation", data.score);
  }

  return true;
}

//function to send user otp codes
export async function findUser(email: string) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      // User not found
      console.error("Ooops! we couldn't find your account");
      return null;
    }
    // Create OTP in the database
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//function to create OTP code in the database
export async function createOtpCode(email: string, otp: string) {
  try {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
    await prisma.OTP.create({
      data: {
        email,
        code: otp,
        expiresAt: expiresAt,
      },
    });
    const data = await sendEmail(email, otp);
    return data.message;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
//function to send email
export async function sendEmail(email: string, otp: string) {
  try {
    const body = { email: email, otpCode: otp };
    const response = await fetch(`${baseUrl}/mailer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send OTP email:", errorData);
      throw new Error("Failed to send OTP email. Please try again later.");
    }
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

//function to verify the OTP
// export async function verifyOTP(email: string, otpCode: string) {
//   let otpEntry: any;
//   try {
//     otpEntry = await prisma.OTP.findFirst({
//       where: {
//         email: email,
//         code: otpCode,
//       },
//     });

//     if (!otpEntry) {
//       throw new Error("Wrong OTP code provided");
//     }

//     if (new Date() > otpEntry.expiresAt) {
//       throw new Error("The OTP code has expired");
//     }

//     return { message: "OTP verified successfully" };
//   } catch (error) {
//     console.error("OTP verification failed:", error);
//     throw new Error(error);
//   } finally {
//     //delete the otp after verification
//     if (otpEntry) {
//       await prisma.OTP.delete({
//         where: {
//           id: otpEntry.id,
//         },
//       });
//     }
//     await prisma.$disconnect();
//   }
// }

//function to resend OTP email
export async function resendOTPEmail(email: string, otpCode: string) {
  try {
    await prisma.OTP.deleteMany({
      where: {
        email: email,
      },
    });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
    await prisma.OTP.create({
      data: {
        email,
        code: otpCode,
        expiresAt: expiresAt,
      },
    });
    const data = await sendEmail(email, otpCode);
    return data.message;
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email!");
  }
}
