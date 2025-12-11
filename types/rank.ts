/**
 * Type definitions for Google Rank Checker
 */

export interface ZenserpSearchResult {
  organic: Array<{
    position: number;
    title: string;
    url: string;
    domain: string;
    description?: string;
  }>;
}

export interface RankCheckParams {
  domain: string;
  keyword: string;
  location: string;
}

export interface RankResult {
  rank: number | 'not found';
  matchedUrl: string | null;
  top10Results: Array<{
    position: number;
    title: string;
    url: string;
    domain: string;
    description?: string;
  }>;
  cache_used: boolean;
  cache_timestamp: number | null;
}

export interface RankCheckResponse {
  success: boolean;
  data?: RankResult;
  error?: string;
}

export type LocationOption = 'us' | 'uk' | 'ca' | 'au' | 'global';

export interface LocationConfig {
  value: LocationOption;
  label: string;
  gl: string;
  location?: string;
}

