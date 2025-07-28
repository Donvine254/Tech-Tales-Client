import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import { cache } from "react";

export const isVerifiedUser = cache(async () => {
  const user = await getSession();
  if (!user) {
    redirect("/login");
  }
  return user as Session;
});
