// import prisma from "@/prisma/prisma";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req, res) {
//   if (req.method !== "POST") {
//     return NextResponse.json(
//       { message: "Method not allowed" },
//       { status: 405 }
//     );

//   try {
//     const userData = await req.json();
//     console.log(userData.email);
//     const user = await prisma.users.findFirst({
//       where: { email: userData.email },
//     });

//     if (!user) {
//       return NextResponse.json({ errors: ["User not found"] }, { status: 404 });
//     }

//     const tokenData = {
//       id: user.id.toString(),
//       email: user.email,
//       username: user.username,
//       picture: user.picture,
//       socials: user.socials,
//       bio: user.bio,
//       role: user.role,
//     };

//     // Generate a JWT token
//     const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
//       expiresIn: "8h",
//     });

//     const response = NextResponse.json(
//       {
//         id: user.id.toString(),
//         username: user.username,
//         email: user.email,
//         picture: user.picture,
//         socials: user.socials,
//         bio: user.bio,
//         role: user.role,
//       },
//       { status: 200 }
//     );
//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         errors: ["Internal server error"],
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
