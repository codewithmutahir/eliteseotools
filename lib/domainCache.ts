/**
 * Cache utilities for Domain Authority results
 * 24-hour cache lifetime with automatic expiration
 */

import { getDatabase } from './db';
import type { DomainAuthorityMetrics } from './dataforseo';

const CACHE_EXPIRY_HOURS = 24;
const CACHE_EXPIRY_MS = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

export interface DomainCacheRecord {
  domain: string;
  metrics: DomainAuthorityMetrics;
  created_at: number;
}

/**
 * Initialize domain authority cache table
 */
export function initializeDomainCacheSchema(database: any): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS domain_authority_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT NOT NULL UNIQUE,
      metrics TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    
    CREATE INDEX IF NOT EXISTS idx_domain_authority_cache_domain 
    ON domain_authority_cache(domain, created_at);
  `);
}

/**
 * Get cached domain authority result if exists and not expired
 */
export function getCachedDomainAuthority(
  domain: string
): DomainCacheRecord | null {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT domain, metrics, created_at
      FROM domain_authority_cache
      WHERE domain = ?
      ORDER BY created_at DESC
      LIMIT 1
    `);

    const row = stmt.get(domain.toLowerCase()) as {
      domain: string;
      metrics: string;
      created_at: number;
    } | undefined;

    if (!row) {
      return null;
    }

    const now = Date.now();
    const age = now - row.created_at;

    // Check if cache is expired (24 hours)
    if (age > CACHE_EXPIRY_MS) {
      // Delete expired record
      deleteCachedDomainAuthority(domain);
      return null;
    }

    return {
      domain: row.domain,
      metrics: JSON.parse(row.metrics) as DomainAuthorityMetrics,
      created_at: row.created_at,
    };
  } catch (error) {
    console.error('Error reading domain authority cache:', error);
    return null;
  }
}

/**
 * Save domain authority result to cache
 */
export function saveCachedDomainAuthority(
  domain: string,
  metrics: DomainAuthorityMetrics
): void {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO domain_authority_cache 
      (domain, metrics, created_at)
      VALUES (?, ?, ?)
    `);

    stmt.run(domain.toLowerCase(), JSON.stringify(metrics), Date.now());
  } catch (error) {
    console.error('Error saving domain authority cache:', error);
    // Don't throw - caching failures shouldn't break the API
  }
}

/**
 * Delete cached domain authority result
 */
function deleteCachedDomainAuthority(domain: string): void {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      DELETE FROM domain_authority_cache
      WHERE domain = ?
    `);

    stmt.run(domain.toLowerCase());
  } catch (error) {
    console.error('Error deleting domain authority cache:', error);
  }
}

/**
 * Clean up expired cache entries (utility function)
 */
export function cleanupExpiredDomainCache(): number {
  try {
    const db = getDatabase();
    const expiryTime = Date.now() - CACHE_EXPIRY_MS;
    const stmt = db.prepare(`
      DELETE FROM domain_authority_cache
      WHERE created_at < ?
    `);

    const result = stmt.run(expiryTime);
    return result.changes;
  } catch (error) {
    console.error('Error cleaning up domain authority cache:', error);
    return 0;
  }
}

