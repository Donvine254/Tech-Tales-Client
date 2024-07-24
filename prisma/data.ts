import bcrypt from "bcryptjs";
import { slugify } from "@/lib";
// const createUserAvatar = (username) => {
//   return `https://ui-avatars.com/api/?background=random&name=${username}`;
// };

// const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// };
// const createUsers = async () => {
//   const users = [
//     {
//       username: "The Don",
//       email: "donvinemugendi@gmail.com",
//       password_digest: await hashPassword("donvine2030"),
//       picture:
//         "https://res.cloudinary.com/dipkbpinx/image/upload/v1704744674/okxuarpfr2snikpkkx1c.png",
//     },
//     {
//       username: "Tech Girl",
//       email: "wanjikushicks@gmail.com",
//       password_digest: await hashPassword("wanjiku2030"),
//       picture:
//         "https://res.cloudinary.com/dipkbpinx/image/upload/v1703035232/ykwzmb98scapwbu2xyak.jpg",
//     },
//     {
//       username: "Tech Assassin",
//       email: "admin@techtales.com",
//       password_digest: await hashPassword("admin2030"),
//       picture:
//         "https://res.cloudinary.com/dipkbpinx/image/upload/v1704846207/nglbsgjexkchr5uorvg2.jpg",
//     },
//     {
//       username: "Diamond Degesh",
//       email: "diamonddegesh@gmail.com",
//       password_digest: await hashPassword("donvine2030"),
//       picture:
//         "https://res.cloudinary.com/dipkbpinx/image/upload/v1704933173/badwfrnlys9ldszthtb7.jpg",
//     },
//     {
//       username: "Jane Wanjiru",
//       email: "jane@gmail.com",
//       password_digest: await hashPassword("jane2030"),
//       picture:
//         "https://res.cloudinary.com/dipkbpinx/image/upload/v1721064661/a8q9rrcw24wlouvv6vm0.png",
//     },
//   ];

//   return users;
// };

// // Example usage
// export const getUsers = async () => {
//   return await createUsers();
// };

export const comments = [
  {
    body: "PHP is the best. I bought my first lambo 🚙 with it!! ",
    blogId: 7,
    authorId: 1,
  },
  {
    body: "<p>PHP is dead @the_don😂</p>",

    blogId: 7,
    authorId: 2,
  },
  {
    body: '<p>Top of the table should be <span style="text-decoration: underline; color: rgb(45, 194, 107);"><em>javascript</em></span>, <span style="text-decoration: underline; color: rgb(53, 152, 219);"><em>python</em></span>, <span style="text-decoration: underline; color: rgb(74, 62, 45);"><em>rust</em></span> and <span style="text-decoration: underline; color: rgb(126, 140, 141);"><em>go💪</em></span></p>',
    blogId: 7,
    authorId: 3,
  },
];
