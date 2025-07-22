"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Session } from "@/types";
import { getSession } from "@/lib/actions/session";

const SessionContext = createContext<{
  session: Session | null;
  setSession: (s: Session | null) => void;
}>({
  session: null,
  setSession: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  // Optional: fallback client fetch
  useEffect(() => {
    (async () => {
      const session = (await getSession()) as Session;
      setSession(session);
    })();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
