"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { Session } from "@/types";
import { getSession } from "@/lib/actions/session";


const SessionContext = createContext<{
    session: Session | null;
    setSession: (s: Session | null) => void;
}>({
    session: null,
    setSession: () => { },
});

export function SessionProvider({
    initialSession,
    children,
}: {
    initialSession: Session | null;
    children: React.ReactNode;
}) {
    const [session, setSession] = useState<Session | null>(initialSession);

    // Optional: fallback client fetch
    useEffect(() => {
        if (initialSession)
            (async () => {
                const session = await getSession() as Session;
                setSession(session);

            })();
    }, [initialSession]);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}