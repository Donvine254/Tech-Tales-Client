import type { Metadata } from "next";
import { getUserData } from "@/lib/actions/user";
import type { UserProfileData } from "@/types";
import SettingsPage from "./settings-page";

export const metadata: Metadata = {
	title: "Update your profile settings - Tech Tales",
	description: "Explore our top-picked tech stories curated just for you.",
};
export default async function Page() {
	const userData = (await getUserData()) as UserProfileData;
	return (
		<div className="min-h-screen bg-background transition-colors duration-300">
			<SettingsPage user={userData} />
		</div>
	);
}
