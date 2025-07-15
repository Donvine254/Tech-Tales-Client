import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import SettingsPage from "./settings-page";
import { fetchProfileData } from "@/lib/actions/user";

export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session || !session.userId) {
    redirect("/");
  }
  const user = await fetchProfileData(session.userId);
  if (!user) {
    redirect("/me");
  }
  return (
    <div className="min-h-screen transition-colors duration-300">
      <SettingsPage user={user} />
    </div>
  );
}
