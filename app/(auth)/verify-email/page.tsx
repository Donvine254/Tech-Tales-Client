import {
  getEmailVerificationCookie,
  getEmailVerificationCookieData,
  getSession,
} from "@/lib/actions/session";
import { redirect } from "next/navigation";
import VerifyEmail from "./verify-page";
export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  const verification_token = (await getEmailVerificationCookie()) as
    | string
    | null;
  const data = (await getEmailVerificationCookieData()) as {
    userId: number;
    email: string;
  } | null;
  if (!verification_token || !data) {
    redirect("/checkpoint/unverified?error=invalid-verification-token");
  }
  return (
    <section>
      <VerifyEmail email={data.email} token={verification_token} />
    </section>
  );
}
