"use server";
import nodemailer from "nodemailer";
import {
  otpTemplate,
  welcomeTemplate,
  accountDeletionTemplate,
  adminRegistrationTemplate,
} from "./template";

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
  html: any;
}) => {
  await transporter.sendMail(emailOptions);
};

export const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    const response = await sendEmail({
      subject: `Your OTP Verification Code is ${otp}`,
      to: email,
      from: sender,
      html: otpTemplate(otp),
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
    const response = await sendEmail({
      subject: "Welcome to TechTales 🎉",
      to: email,
      from: sender,
      html: welcomeTemplate(name),
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
    const response = await sendEmail({
      subject: "Welcome to TechTales 🎉",
      to: email,
      from: sender,
      html: adminRegistrationTemplate(name, email, password, role),
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
  const link = `https://techtales.vercel.app/restore/e=${encodedEmail}&id=${encodedId}`;
  const secureLink = encodeURI(link);
  try {
    const response = await sendEmail({
      subject: "Welcome to TechTales 🎉",
      to: email,
      from: sender,
      html: accountDeletionTemplate(name, email, secureLink),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
};
