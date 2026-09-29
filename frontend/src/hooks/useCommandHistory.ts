import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CommandHistory } from "../utils/types";

export function useCommandHistory(
  commandId: string,
  REFETCH_INTERVAL_MS: number,
): UseQueryResult<CommandHistory[]> {
  // TODO: (STEP 7) Implement this hook.
  // This hook should use React Query and return CommandHistory[].
  // Define the refetch interval as a local constant.
  return useQuery({
    queryKey: [commandId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8001/api/commands/${commandId}/history`,
      );
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const body = await res.json();
      return body.items;
    },
    refetchInterval: REFETCH_INTERVAL_MS,
  });
}
