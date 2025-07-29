"use server";
import nodemailer from "nodemailer";
import {
  EmailVerificationTemplate,
  WelcomeTemplate,
  AccountDeletionTemplate,
  AdminRegistrationTemplate,
  PasswordResetTemplate,
} from "./templates";
import { createAccountActionsToken } from "@/lib/actions/jwt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sender = `"TechTales" <admin@techtales.vercel.app>`;

export const sendEmail = async (emailOptions: {
  subject: string;
  from: string;
  to: string;
  html: string;
}) => {
  await transporter.sendMail(emailOptions);
};

export const sendVerificationEmail = async (email: string, link: string) => {
  try {
    await sendEmail({
      subject: `Verify your email address`,
      to: email,
      from: sender,
      html: EmailVerificationTemplate(link),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await sendEmail({
      subject: "Welcome to TechTales 🎉",
      to: email,
      from: sender,
      html: WelcomeTemplate(name),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};

export const sendAdminRegistrationEmail = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    await sendEmail({
      subject: "Welcome to TechTales 🎉",
      to: email,
      from: sender,
      html: AdminRegistrationTemplate(name, email, password, role),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
export const sendDeleteNotificationEmail = async (
  name: string,
  email: string,
  id: number,
  keepBlogs: boolean,
  keepComments: boolean
) => {
  // create a restore token
  const token = await createAccountActionsToken(
    {
      id: id,
      username: name,
      email: email,
    },
    "30d"
  );
  const link = `https://techtales.vercel.app/restore?token=${token}`;
  const secureLink = encodeURI(link);
  try {
    await sendEmail({
      subject: "Important: Your Tech Tales Account has been Deleted",
      to: email,
      from: sender,
      html: AccountDeletionTemplate(
        name,
        email,
        secureLink,
        keepBlogs,
        keepComments
      ),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
/* function to send instructions to reset password */
export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  link: string
) => {
  try {
    await sendEmail({
      subject: "Important: Reset your account password",
      to: email,
      from: sender,
      html: PasswordResetTemplate(name, link),
    });
    console.log("Email sent successfully");
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { success: false, message: "Email delivery failed" };
  }
};
