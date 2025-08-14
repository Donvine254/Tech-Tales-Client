"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Session } from "@/types";
import { getSession } from "@/lib/actions/session";
import { updateUserActivityStatus } from "@/lib/actions/analytics";

const SessionContext = createContext<{
  session: Session | null;
  setSession: (s: Session | null) => void;
  loading: boolean;
}>({
  session: null,
  setSession: () => {},
  loading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const session = (await getSession()) as Session | null;
      setSession(session ?? null);
      setLoading(false);
    })();
  }, []);

  //Update user status, should only run once
  useEffect(() => {
    if (session?.userId) {
      updateUserActivityStatus(Number(session.userId), "ACTIVE");
    }
  }, [session?.userId]);

  return (
    <SessionContext.Provider value={{ session, setSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
