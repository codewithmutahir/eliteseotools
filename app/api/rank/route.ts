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

// Helper function to add CORS headers
function addCorsHeaders<T>(response: NextResponse<T>): NextResponse<T> {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse<RankCheckResponse>> {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = rankCheckSchema.safeParse(body);
    if (!validationResult.success) {
    const response = NextResponse.json(
      {
        success: false,
        error: validationResult.error.errors[0]?.message || 'Invalid input',
      },
      { status: 400 }
    );
    return addCorsHeaders(response);
    }

    const { domain, keyword, location } = validationResult.data;

    // Normalize domain
    const normalizedDomain = normalizeDomain(domain);

    // Check cache first
    const cached = getCachedResult(keyword, normalizedDomain, location);

    if (cached) {
      const response = NextResponse.json({
        success: true,
        data: {
          ...cached.result,
          cache_used: true,
          cache_timestamp: cached.created_at,
        },
      });
      return addCorsHeaders(response);
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
    const response = NextResponse.json({
      success: true,
      data: {
        ...rankResult,
        cache_used: false,
        cache_timestamp: Date.now(),
      },
    });
    return addCorsHeaders(response);
  } catch (error) {
    console.error('Rank check API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to check rank';

    const response = NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

// Handle OPTIONS for CORS preflight with restricted origins
export async function OPTIONS(req: NextRequest): Promise<NextResponse> {
  const origin =
    req.headers.get('origin') || req.headers.get('Origin') || '';

  const allowedOrigins = [
    'https://seotools.elitesolutionusa.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost',
    'http://127.0.0.1',
  ];

  let corsOrigin = '';
  if (allowedOrigins.includes(origin)) {
    corsOrigin = origin;
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  });
}


// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

