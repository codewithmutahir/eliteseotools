/**
 * Zenserp API service for fetching Google search results
 */

import type { ZenserpSearchResult, RankResult } from '@/types/rank';

const ZENSERP_API_KEY = process.env.ZENSERP_API_KEY;
const ZENSERP_BASE_URL = 'https://app.zenserp.com/api/v2/search';

if (!ZENSERP_API_KEY) {
  console.warn('ZENSERP_API_KEY is not set in environment variables');
}

/**
 * Normalize domain for comparison
 * Removes protocol, www, trailing slashes, and converts to lowercase
 */
export function normalizeDomain(domain: string): string {
  return domain
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .trim();
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return normalizeDomain(urlObj.hostname);
  } catch {
    return normalizeDomain(url);
  }
}

/**
 * Fetch search results from Zenserp API
 */
export async function fetchZenserpResults(
  keyword: string,
  location: string,
  gl: string = 'us'
): Promise<ZenserpSearchResult> {
  if (!ZENSERP_API_KEY) {
    throw new Error('ZENSERP_API_KEY is not configured');
  }

  const params = new URLSearchParams({
    q: keyword,
    num: '20',
    gl,
  });

  // Add location parameter if provided and not global
  if (location && location !== 'global' && location.trim() !== '') {
    params.append('location', location);
  }

  const url = `${ZENSERP_BASE_URL}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'apikey': ZENSERP_API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Zenserp API error: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  const data = await response.json() as ZenserpSearchResult;
  return data;
}

/**
 * Extract ranking from search results
 */
export function extractRanking(
  results: ZenserpSearchResult,
  targetDomain: string
): RankResult {
  const normalizedTarget = normalizeDomain(targetDomain);
  const top10Results = (results.organic || [])
    .slice(0, 10)
    .map((item) => ({
      position: item.position,
      title: item.title,
      url: item.url,
      domain: item.domain || extractDomain(item.url),
      description: item.description,
    }));

  // Find rank in top 10
  let rank: number | 'not found' = 'not found';
  let matchedUrl: string | null = null;

  for (const result of top10Results) {
    const normalizedResultDomain = normalizeDomain(result.domain);
    if (normalizedResultDomain === normalizedTarget) {
      rank = result.position;
      matchedUrl = result.url;
      break;
    }
  }

  // If not found in top 10, check positions 11-100
  if (rank === 'not found') {
    const remainingResults = (results.organic || []).slice(10);
    for (const result of remainingResults) {
      const normalizedResultDomain = normalizeDomain(result.domain);
      if (normalizedResultDomain === normalizedTarget) {
        rank = result.position;
        matchedUrl = result.url;
        break;
      }
    }
  }

  return {
    rank,
    matchedUrl,
    top10Results,
    cache_used: false,
    cache_timestamp: null,
  };
}

