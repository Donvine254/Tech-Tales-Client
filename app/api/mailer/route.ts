import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (emailOptions: {
  subject: string;
  from: string;
  to: string;
  html: any;
}) => {
  await transporter.sendMail(emailOptions);
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, otpCode } = data;

    const emailHtml = `
      <div>
        <h3>Your TechTales OTP</h3>
        <p> Below is your one time passcode that you need to use to complete your authentication. The verification code will be valid for 5 minutes. Please do not share this code with anyone.</p>
          <p style="background-color: #f0f0f0; color: #333; padding: 5px; border-radius: 5px;">Your OTP code is: <strong >${otpCode}</strong></p>
        <p>If you didn't request this code, please ignore this email or contact support.</p>
      </div>
    `;

    await sendEmail({
      subject: "Your OTP Code",
      to: email,
      from: `"TechTales" <admin@techtales.vercel.app>`,
      html: emailHtml,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email delivery failed:", error);
    return new Response("Email delivery failed", { status: 400 });
  }
}

// https://www.corbado.com/blog/nextjs-login-page
//https://ethereal.email/
