import { getEmailVerificationCookie } from "@/lib/actions/session";
import { redirect } from "next/navigation";
import VerifyEmail from "./verify-page";
export default async function Page() {
  const verification_token = (await getEmailVerificationCookie()) as {
    userId: number;
    email: string;
  } | null;
  if (!verification_token) {
    redirect("/login?error=invalid-verification-token");
  }
  return (
    <section>
      <VerifyEmail data={verification_token} />
    </section>
  );
}
