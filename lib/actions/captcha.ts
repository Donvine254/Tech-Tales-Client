"use server";

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
