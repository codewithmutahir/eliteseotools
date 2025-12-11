/**
 * DataForSEO API Client
 * Production-grade client with authentication, rate limiting, and error handling
 */

const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com/v3';
const API_LOGIN = 'mutahir@elitesolutionscpa.com';
const API_PASSWORD = 'd23aa8c3b1b6cfb6';

// Rate limiting: max 1 request per second
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second in milliseconds

// Request queue for rate limiting
const requestQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  execute: () => Promise<any>;
}> = [];
let isProcessingQueue = false;

/**
 * Generate Basic Auth header
 */
function getAuthHeader(): string {
  const credentials = `${API_LOGIN}:${API_PASSWORD}`;
  const encoded = Buffer.from(credentials).toString('base64');
  return `Basic ${encoded}`;
}

/**
 * Process request queue with rate limiting
 */
async function processQueue(): Promise<void> {
  if (isProcessingQueue || requestQueue.length === 0) {
    return;
  }

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    // Wait if needed to maintain 1 req/sec rate limit
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    const { execute, resolve, reject } = requestQueue.shift()!;
    lastRequestTime = Date.now();

    try {
      const result = await execute();
      resolve(result);
    } catch (error) {
      reject(error as Error);
    }
  }

  isProcessingQueue = false;
}

/**
 * Queue a request for rate-limited execution
 */
function queueRequest<T>(execute: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    requestQueue.push({ execute, resolve, reject });
    processQueue();
  });
}

/**
 * Make a rate-limited request to DataForSEO API
 */
async function makeRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'POST',
  body?: any
): Promise<T> {
  return queueRequest(async () => {
    const url = `${DATAFORSEO_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && method === 'POST') {
      requestOptions.body = JSON.stringify(body);
    }

    let response: Response;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount <= maxRetries) {
      try {
        response = await fetch(url, requestOptions);

        // Handle rate limiting (429)
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          const waitTime = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : (retryCount + 1) * 2000; // Exponential backoff

          if (retryCount < maxRetries) {
            console.warn(
              `Rate limited. Retrying after ${waitTime}ms (attempt ${retryCount + 1}/${maxRetries})`
            );
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            retryCount++;
            continue;
          } else {
            throw new Error('Rate limit exceeded. Please try again later.');
          }
        }

        // Handle other HTTP errors
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = `API request failed with status ${response.status}`;
          
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorJson.error || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }

          throw new Error(errorMessage);
        }

        const data = await response.json();

        // Check DataForSEO status code
        if (data.status_code !== 20000) {
          const errorMessage =
            data.status_message ||
            `API returned status code: ${data.status_code}`;
          throw new Error(errorMessage);
        }

        return data as T;
      } catch (error) {
        if (error instanceof Error && error.message.includes('Rate limit')) {
          throw error;
        }

        // Network or other errors
        if (retryCount < maxRetries) {
          const waitTime = (retryCount + 1) * 1000;
          console.warn(
            `Request failed. Retrying after ${waitTime}ms (attempt ${retryCount + 1}/${maxRetries})`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          retryCount++;
          continue;
        }

        throw error;
      }
    }

    throw new Error('Max retries exceeded');
  });
}

/**
 * Domain Authority Metrics Interface
 */
export interface DomainAuthorityMetrics {
  domain: string;
  domain_rank?: number;
  backlinks_total?: number;
  referring_domains?: number;
  new_links_30d?: number;
  lost_links_30d?: number;
  last_updated?: number;
}

/**
 * DataForSEO Backlinks Summary Response
 */
interface DataForSEOSummaryResponse {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: Array<{
    id: string;
    status_code: number;
    status_message: string;
    time: string;
    cost: number;
    result_count: number;
    path: string[];
    data: {
      target: string;
      backlinks: number;
      referring_domains: number;
      referring_main_domains: number;
      referring_ips: number;
      referring_subnets: number;
      referring_pages: number;
      dofollow: number;
      nofollow: number;
      referring_domains_types: {
        referring_domains: number;
        referring_main_domains: number;
        referring_ips: number;
        referring_subnets: number;
        referring_pages: number;
        dofollow: number;
        nofollow: number;
      };
      backlinks_types: {
        referring_domains: number;
        referring_main_domains: number;
        referring_ips: number;
        referring_subnets: number;
        referring_pages: number;
        dofollow: number;
        nofollow: number;
      };
      referring_domains_rank: number;
      referring_main_domains_rank: number;
      backlinks_rank: number;
      domain_rank: number;
      last_updated: string;
      new_backlinks: number;
      lost_backlinks: number;
      new_referring_domains: number;
      lost_referring_domains: number;
      new_referring_main_domains: number;
      lost_referring_main_domains: number;
      new_referring_ips: number;
      lost_referring_ips: number;
      new_referring_subnets: number;
      lost_referring_subnets: number;
      new_referring_pages: number;
      lost_referring_pages: number;
      new_dofollow: number;
      lost_dofollow: number;
      new_nofollow: number;
      lost_nofollow: number;
      time_range: {
        from_date: string;
        to_date: string;
      };
    }[];
  }>;
}

/**
 * Get domain authority metrics from DataForSEO
 */
export async function getDomainAuthority(
  domain: string
): Promise<DomainAuthorityMetrics> {
  // Normalize domain (remove protocol, www, trailing slashes)
  const normalizedDomain = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .split('/')[0]; // Take only domain part

  if (!normalizedDomain) {
    throw new Error('Invalid domain provided');
  }

  try {
    // DataForSEO API requires an array of tasks
    const response = await makeRequest<DataForSEOSummaryResponse>(
      '/backlinks/summary/live',
      'POST',
      [
        {
          target: normalizedDomain,
          target_type: 'domain',
        },
      ]
    );

    // Extract data from response
    const task = response.tasks?.[0];
    if (!task || task.status_code !== 20000) {
      throw new Error(
        task?.status_message || 'Failed to retrieve domain data'
      );
    }

    const result = task.data?.[0];
    if (!result) {
      throw new Error('No data returned for domain');
    }

    // Map DataForSEO response to our metrics format
    const metrics: DomainAuthorityMetrics = {
      domain: normalizedDomain,
      domain_rank: result.domain_rank ?? undefined,
      backlinks_total: result.backlinks ?? undefined,
      referring_domains: result.referring_domains ?? undefined,
      new_links_30d: result.new_backlinks ?? undefined,
      lost_links_30d: result.lost_backlinks ?? undefined,
      last_updated: result.last_updated
        ? new Date(result.last_updated).getTime()
        : Date.now(),
    };

    return metrics;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch domain authority metrics');
  }
}

