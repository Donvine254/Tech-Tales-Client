import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/providers/session";
import { getActiveSessions } from "@/lib/actions/manage-sessions";

export type RawSession = {
	id: string;
	createdAt: Date;
	expiresAt: Date;
	ipAddress?: string | null;
	userAgent?: string | null;
	isCurrentDevice: boolean;
	location?: string;
};

async function fetchSessions(userId: number): Promise<RawSession[]> {
	const sessions = await getActiveSessions(userId);

	return Promise.all(
		sessions.map(async (s) => {
			if (!s.ipAddress) return { ...s, location: "" };
			try {
				const res = await fetch(`/api/location?ip=${s.ipAddress}`);
				const data = await res.json();
				return { ...s, location: data.location || "" };
			} catch {
				return { ...s, location: "" };
			}
		}),
	);
}

interface UseSessionsResult {
	sessions: RawSession[];
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => void;
}

export function useListSessions(): UseSessionsResult {
	const { session } = useSession();

	const query = useQuery<RawSession[], Error>({
		queryKey: ["sessionsList", session?.userId],
		queryFn: () => fetchSessions(session!.userId),
		enabled: !!session?.userId, // don't fetch if no session
		staleTime: 5 * 60 * 1000,
	});

	return {
		sessions: query.data ?? [],
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error ?? null,
		refetch: () => query.refetch(),
	};
}
