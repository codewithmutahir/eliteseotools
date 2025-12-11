/**
 * SQLite database connection and initialization
 */

import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Use /tmp for Vercel serverless, local data directory otherwise
const isVercel = process.env.VERCEL === '1';
const DB_DIR = isVercel ? '/tmp' : join(process.cwd(), 'data');
const DB_PATH = join(DB_DIR, 'cache.sqlite');

let db: Database.Database | null = null;

/**
 * Get or create database connection
 */
export function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  try {
    // Ensure data directory exists (safe to call multiple times)
    if (!existsSync(DB_DIR)) {
      mkdirSync(DB_DIR, { recursive: true });
    }

    db = new Database(DB_PATH);
    
    // Enable WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    
    // Initialize schema
    initializeSchema(db);
    
    console.log(`✅ Database initialized at: ${DB_PATH}`);
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Initialize database schema
 */
function initializeSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS rank_cache (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      keyword TEXT NOT NULL,
      domain TEXT NOT NULL,
      location TEXT NOT NULL,
      result TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      UNIQUE(keyword, domain, location)
    );
    
    CREATE INDEX IF NOT EXISTS idx_rank_cache_lookup 
    ON rank_cache(keyword, domain, location, created_at);
    
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
 * Close database connection (useful for cleanup)
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

