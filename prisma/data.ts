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
    body: "<p>Wow, I have learned alot. This elements just make things way simple and minimize the need to use javascript!💪</p>",
    blogId: 11,
    authorId: 1,
  },
  {
    body: '<p>What is the difference between <strong><span style="color: rgb(35, 111, 161);">&lt;meter/&gt;</span></strong> and <strong><span style="color: rgb(35, 111, 161);">&lt;progress/&gt;</span></strong>. To me they seem like they do the same thing?🤷</p>',
    blogId: 11,
    authorId: 2,
  },
  {
    body: "<p>I think the main difference between meter and progress elements is that:</p>\n<ul>\n<li>The progress element represents the completion progress of a task.</li>\n<li>The meter element represents a scalar measurement within a known range, or a fractional value</li>\n<li>Typically progress is one way change from zero to max. While the meter value may fluctuate in either direction, depending in its function.</li>\n</ul>",
    blogId: 11,
    authorId: 1,
  },
  {
    body: "<p>That makes alot of sense @thedon</p>",
    blogId: 11,
    authorId: 2,
  },
  {
    body: "<p>💘❤️</p>",
    blogId: 11,
    authorId: 4,
  },
  {
    body: "<p>Great article, this is so educative</p>",
    blogId: 11,
    authorId: 5,
  },
];
