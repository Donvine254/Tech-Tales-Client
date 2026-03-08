"use server";
import nodemailer from "nodemailer";
import {
  EmailVerificationTemplate,
  WelcomeEmailTemplate,
  AccountDeletionTemplate,
  PasswordResetEmailTemplate,
  AccountDeactivationTemplate,
  MagicLinkEmailTemplate,
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
      subject: `Verify Your Email Address - Techtales`,
      to: email,
      from: sender,
      html: EmailVerificationTemplate(link),
    });
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
      html: WelcomeEmailTemplate(name),
    });
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
export const sendMagicLinkEmail = async (email: string, link: string) => {
  try {
    await sendEmail({
      subject: `Login to your Techtales Account`,
      to: email,
      from: sender,
      html: MagicLinkEmailTemplate(link),
    });
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};

export const sendDeactivationNotificationEmail = async (
  name: string,
  email: string,
  keepBlogs: boolean,
  keepComments: boolean,
  link:string,
) => {
  const secureLink = encodeURI(link);
  try {
    await sendEmail({
      subject: "Important: Your Tech Tales Account has been Deactivated",
      to: email,
      from: sender,
      html: AccountDeactivationTemplate(
        name,
        email,
        secureLink,
        keepBlogs,
        keepComments,
      ),
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
  keepBlogs: boolean,
  keepComments: boolean,
) => {
  // create a restore token
  try {
    await sendEmail({
      subject: "Important: Your Tech Tales Account has been Deleted",
      to: email,
      from: sender,
      html: AccountDeletionTemplate(name, email, keepBlogs, keepComments),
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
  link: string,
) => {
  try {
    await sendEmail({
      subject: "Important: Reset your account password",
      to: email,
      from: sender,
      html: PasswordResetEmailTemplate(name, link),
    });
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { success: false, message: "Email delivery failed" };
  }
};
