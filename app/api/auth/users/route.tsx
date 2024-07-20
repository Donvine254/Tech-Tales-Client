// import prisma from "@/prisma/prisma";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// type userData = {
//   username: string;
//   password: string;
//   email: string;
//   bio?: string;
//   picture?: string;
//   role?: string;
// };

// const createUserAvatar = (username: string) => {
//   return `https://ui-avatars.com/api/?background=random&name=${username}`;
// };

// export async function POST(req: NextRequest) {
//   if (req.method !== "POST") {
//     return NextResponse.json(
//       { message: "Method not allowed" },
//       { status: 405 }
//     );
//   }

//   try {
//     const data: userData = await req.json();
//     const createData = {
//       email: data.email,
//       password_digest: await bcrypt.hash(data.password, 10),
//       picture: createUserAvatar(data.username),
//       role: data.role ?? "user",
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     const user = await prisma.users.create({
//       data: createData,
//     });

//     return NextResponse.json(
//       { message: "user created successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);

//     // Checking Prisma error code for unique constraint violation
//     if (error instanceof prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         return NextResponse.json(
//           {
//             message:
//               "There is a unique constraint violation. A new user cannot be created with this email.",
//           },
//           { status: 400 }
//         );
//       }
//     }

//     return NextResponse.json({ errors: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// // this violated uniqueness check

import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type userData = {
  username: string;
  password: string;
  email: string;
  bio?: string;
  picture?: string;
  role?: string;
};

const createUserAvatar = (username: string) => {
  return `https://ui-avatars.com/api/?background=random&name=${username}`;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const data: userData = await req.json();

    // Check if email or username already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { errors: ["Email or username already exists"] },
        { status: 409 }
      );
    }
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { errors: ["Invalid email format"] },
        { status: 400 }
      );
    }

    const createData = {
      email: data.email,
      username: data.username,
      password_digest: await bcrypt.hash(data.password, 10),
      picture: createUserAvatar(data.username),
      role: data.role ?? "user",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = await prisma.users.create({
      data: createData,
    });

    return NextResponse.json(
      {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        bio: user.bio ?? "",
        picture: user.picture,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { errors: ["Internal server error"] },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
