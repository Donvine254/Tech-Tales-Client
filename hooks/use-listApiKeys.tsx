import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/providers/session";
import { getApiKeys } from "@/lib/actions/apikey";
export type ApiKeyItem = {
  id: string;
  name: string | null;
  start: string | null;
  expiresAt: Date | null;
  createdAt: Date;
};

interface UseListApiKeysResult {
  apiKeys: ApiKeyItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useListApiKeys(): UseListApiKeysResult {
  const { session } = useSession();
  const queryClient = useQueryClient();

  const query = useQuery<ApiKeyItem[], Error>({
    queryKey: ["apiKeysList", session?.userId],
    queryFn: () => getApiKeys() as Promise<ApiKeyItem[]>,
    enabled: !!session?.userId,
    staleTime: 0,
  });

  return {
    apiKeys: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ?? null,
    refetch: () =>
      queryClient.invalidateQueries({ queryKey: ["apiKeysList"] }),
  };
}