/**
 * TanStack Query hook for Google Rank Checker
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { RankCheckResponse, RankCheckParams } from '@/types/rank';

interface UseRankCheckerOptions {
  enabled?: boolean;
}

/**
 * Custom hook for checking Google rankings
 * 
 * @param params - Rank check parameters (domain, keyword, location)
 * @param options - Query options (enabled, etc.)
 * @returns TanStack Query result
 */
export function useRankChecker(
  params: RankCheckParams | null,
  options: UseRankCheckerOptions = {}
): UseQueryResult<RankCheckResponse, Error> {
  const { enabled = false } = options;

  return useQuery({
    queryKey: ['rank', params?.domain, params?.keyword, params?.location],
    queryFn: async (): Promise<RankCheckResponse> => {
      console.log('🚀 [useRankChecker] Starting rank check with params:', params);
      
      if (!params) {
        throw new Error('Rank check parameters are required');
      }

      console.log('🌐 [useRankChecker] Making fetch request to /api/rank');
      
      try {
        const response = await fetch('/api/rank', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        console.log('📡 [useRankChecker] Response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        });

        if (!response.ok) {
          let errorMessage = `Failed to check rank (${response.status})`;
          try {
            const errorData = await response.json();
            console.error('❌ [useRankChecker] Error response:', errorData);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            console.error('❌ [useRankChecker] Failed to parse error response:', e);
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ [useRankChecker] Success:', data);
        return data;
      } catch (error) {
        console.error('💥 [useRankChecker] Fetch error:', error);
        throw error;
      }
    },
    enabled: enabled && params !== null,
    staleTime: 30 * 60 * 1000, // 30 minutes client-side cache
    gcTime: 60 * 60 * 1000, // 1 hour garbage collection time (formerly cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

