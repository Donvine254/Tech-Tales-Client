import { redirect } from "next/navigation";
import VerifyEmail from "./verify-page";
import { getSession } from "@/lib/actions/session-utils";

export default async function Page({
	searchParams,
}: {
	searchParams: { email?: string };
}) {
	const session = await getSession();
	if (session) {
		redirect("/");
	}
	const email = searchParams.email;
	if (!email) {
		redirect("/checkpoint/unverified?error=invalid-verification-token");
	}
	return (
		<section>
			<VerifyEmail email={email} />
		</section>
	);
}
