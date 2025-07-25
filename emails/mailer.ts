"use server";
import nodemailer from "nodemailer";
import {
  EmailVerificationTemplate,
  WelcomeTemplate,
  AccountDeletionTemplate,
  AdminRegistrationTemplate,
  PasswordResetTemplate,
} from "./templates";

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
  id: number
) => {
  const encodedEmail = btoa(email.toLowerCase());
  const encodedId = btoa(id.toString());
  const link = `https://techtales.vercel.app/restore?e=${encodedEmail}&id=${encodedId}`;
  const secureLink = encodeURI(link);
  try {
    await sendEmail({
      subject: "Important: Your Tech Tales Account has been Deleted",
      to: email,
      from: sender,
      html: AccountDeletionTemplate(name, email, secureLink),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
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
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
