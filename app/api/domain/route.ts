/**
 * API Route Handler for Domain Authority Checker
 * Handles domain authority checking with caching, rate limiting, and authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { getCachedDomainAuthority, saveCachedDomainAuthority } from '@/lib/domainCache';
import { getDomainAuthority, type DomainAuthorityMetrics } from '@/lib/dataforseo';

// Validation schema
const domainCheckSchema = z.object({
  domain: z
    .string()
    .min(1, 'Domain is required')
    .max(255, 'Domain is too long')
    .refine(
      (val) => {
        // Remove protocol and www for validation
        const cleaned = val
          .trim()
          .toLowerCase()
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/$/, '')
          .split('/')[0];
        
        // Basic domain validation (allows subdomains and TLDs)
        const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
        return domainRegex.test(cleaned) && cleaned.length >= 4;
      },
      { message: 'Invalid domain format. Use format like: example.com' }
    ),
});

/**
 * Response type for domain authority check
 */
export interface DomainAuthorityResponse {
  success: boolean;
  data?: DomainAuthorityMetrics & {
    cache_used: boolean;
    cache_timestamp?: number;
  };
  error?: string;
}

/**
 * POST handler for domain authority check
 * Requires authentication
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<DomainAuthorityResponse>> {
  try {
    // Check authentication
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required. Please sign in to use this tool.',
        },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = domainCheckSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            validationResult.error.errors[0]?.message || 'Invalid domain format',
        },
        { status: 400 }
      );
    }

    const { domain } = validationResult.data;

    // Normalize domain (remove protocol, www, trailing slashes)
    const normalizedDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .split('/')[0];

    // Check cache first
    const cached = getCachedDomainAuthority(normalizedDomain);

    if (cached) {
      return NextResponse.json({
        success: true,
        data: {
          ...cached.metrics,
          cache_used: true,
          cache_timestamp: cached.created_at,
        },
      });
    }

    // Fetch from DataForSEO API
    const metrics = await getDomainAuthority(normalizedDomain);

    // Save to cache
    saveCachedDomainAuthority(normalizedDomain, metrics);

    // Return result
    return NextResponse.json({
      success: true,
      data: {
        ...metrics,
        cache_used: false,
        cache_timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error('Domain authority API error:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to check domain authority';

    // Return structured error response
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

