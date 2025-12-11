/**
 * API Route Handler for Google Rank Checker
 * Handles rank checking with caching support
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCachedResult, saveCachedResult } from '@/lib/cache';
import { fetchZenserpResults, extractRanking, normalizeDomain } from '@/lib/zenserp';
import type { RankCheckResponse, LocationOption } from '@/types/rank';

// Location configuration mapping
const LOCATION_CONFIG: Record<LocationOption, { gl: string; location?: string }> = {
  us: { gl: 'us', location: 'United States' },
  uk: { gl: 'uk', location: 'United Kingdom' },
  ca: { gl: 'ca', location: 'Canada' },
  au: { gl: 'au', location: 'Australia' },
  global: { gl: 'us' }, // Default to US for global searches
};

// Validation schema
const rankCheckSchema = z.object({
  domain: z.string().min(1, 'Domain is required').max(255, 'Domain is too long'),
  keyword: z.string().min(1, 'Keyword is required').max(500, 'Keyword is too long'),
  location: z.enum(['us', 'uk', 'ca', 'au', 'global'], {
    errorMap: () => ({ message: 'Invalid location option' }),
  }),
});

export async function POST(request: NextRequest): Promise<NextResponse<RankCheckResponse>> {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = rankCheckSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error.errors[0]?.message || 'Invalid input',
        },
        { status: 400 }
      );
    }

    const { domain, keyword, location } = validationResult.data;

    // Normalize domain
    const normalizedDomain = normalizeDomain(domain);

    // Check cache first
    const cached = getCachedResult(keyword, normalizedDomain, location);

    if (cached) {
      return NextResponse.json({
        success: true,
        data: {
          ...cached.result,
          cache_used: true,
          cache_timestamp: cached.created_at,
        },
      });
    }

    // Get location config
    const locationConfig = LOCATION_CONFIG[location];

    // Fetch from Zenserp API
    // For global, pass 'global' and zenserp.ts will handle it
    const locationParam = location === 'global' ? 'global' : (locationConfig.location || location);
    const searchResults = await fetchZenserpResults(
      keyword,
      locationParam,
      locationConfig.gl
    );

    // Extract ranking
    const rankResult = extractRanking(searchResults, normalizedDomain);

    // Save to cache
    saveCachedResult(keyword, normalizedDomain, location, rankResult);

    // Return result
    return NextResponse.json({
      success: true,
      data: {
        ...rankResult,
        cache_used: false,
        cache_timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error('Rank check API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to check rank';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

