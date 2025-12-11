/**
 * Cache utilities for rank checking
 */

import { getDatabase } from './db';
import type { RankResult } from '@/types/rank';

const CACHE_EXPIRY_DAYS = 30;
const CACHE_EXPIRY_MS = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

export interface CacheRecord {
  keyword: string;
  domain: string;
  location: string;
  result: RankResult;
  created_at: number;
}

/**
 * Get cached result if exists and not expired
 */
export function getCachedResult(
  keyword: string,
  domain: string,
  location: string
): CacheRecord | null {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT keyword, domain, location, result, created_at
      FROM rank_cache
      WHERE keyword = ? AND domain = ? AND location = ?
      ORDER BY created_at DESC
      LIMIT 1
    `);

    const row = stmt.get(keyword, domain, location) as {
      keyword: string;
      domain: string;
      location: string;
      result: string;
      created_at: number;
    } | undefined;

    if (!row) {
      return null;
    }

    const now = Date.now();
    const age = now - row.created_at;

    // Check if cache is expired
    if (age > CACHE_EXPIRY_MS) {
      // Delete expired record
      deleteCachedResult(keyword, domain, location);
      return null;
    }

    return {
      keyword: row.keyword,
      domain: row.domain,
      location: row.location,
      result: JSON.parse(row.result) as RankResult,
      created_at: row.created_at,
    };
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

/**
 * Save result to cache
 */
export function saveCachedResult(
  keyword: string,
  domain: string,
  location: string,
  result: RankResult
): void {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO rank_cache 
      (keyword, domain, location, result, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      keyword,
      domain,
      location,
      JSON.stringify(result),
      Date.now()
    );
  } catch (error) {
    console.error('Error saving to cache:', error);
    // Don't throw - caching failures shouldn't break the API
  }
}

/**
 * Delete cached result
 */
function deleteCachedResult(
  keyword: string,
  domain: string,
  location: string
): void {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      DELETE FROM rank_cache
      WHERE keyword = ? AND domain = ? AND location = ?
    `);

    stmt.run(keyword, domain, location);
  } catch (error) {
    console.error('Error deleting from cache:', error);
  }
}

/**
 * Clean up expired cache entries (utility function)
 */
export function cleanupExpiredCache(): number {
  try {
    const db = getDatabase();
    const expiryTime = Date.now() - CACHE_EXPIRY_MS;
    const stmt = db.prepare(`
      DELETE FROM rank_cache
      WHERE created_at < ?
    `);

    const result = stmt.run(expiryTime);
    return result.changes;
  } catch (error) {
    console.error('Error cleaning up cache:', error);
    return 0;
  }
}

