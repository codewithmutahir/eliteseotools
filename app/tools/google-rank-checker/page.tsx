/**
 * Google Rank Checker Tool Page
 */

"use client";

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { RankForm } from '@/components/RankForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRankChecker } from '@/hooks/useRankChecker';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import type { RankCheckParams } from '@/types/rank';
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function GoogleRankCheckerPage() {
  const [params, setParams] = useState<RankCheckParams | null>(null);
  const { data, isLoading, error, refetch } = useRankChecker(params, {
    enabled: params !== null,
  });
  // Add user/auth state using our auth modal hook
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal();

  const formatDate = (timestamp: number | null): string => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={handleClose} onSuccess={handleSuccess} />
      <ToolLayout
        title="Google Rank Checker"
        description="Check your website's Google search ranking for any keyword. Track your SEO performance and monitor your position in search results."
      >
        <div className="space-y-6">
          <RankForm onSubmit={(params: RankCheckParams) => { requireAuth(() => { setParams(params); }); }} isLoading={isLoading} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {data?.success && data.data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Rank Results</CardTitle>
                      <CardDescription>
                        {params && `Results for "${params.keyword}" on ${params.domain}`}
                      </CardDescription>
                    </div>
                    {data.data.cache_used && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Cached
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rank Display */}
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Rank Position</p>
                      <div className="flex items-center gap-2 mt-1">
                        {data.data.rank === 'not found' ? (
                          <>
                            <XCircle className="h-6 w-6 text-destructive" />
                            <p className="text-2xl font-bold">Not Found</p>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                            <p className="text-2xl font-bold">#{data.data.rank}</p>
                          </>
                        )}
                      </div>
                    </div>
                    {data.data.matchedUrl && (
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Matched URL</p>
                        <a
                          href={data.data.matchedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                        >
                          {data.data.matchedUrl}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Cache Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                    <span>
                      {data.data.cache_used ? 'Cached result' : 'Live result'}
                    </span>
                    {data.data.cache_timestamp && (
                      <span>
                        {formatDate(data.data.cache_timestamp)}
                      </span>
                    )}
                  </div>

                  {/* Top 10 Results */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Top 10 Search Results</h3>
                    <div className="space-y-2">
                      {data.data.top10Results.map((result, index) => {
                        const isMatched = result.url === data.data?.matchedUrl;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 rounded-lg border ${
                              isMatched
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-border bg-card'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                                {result.position}
                              </div>
                              <div className="flex-1 min-w-0">
                                <a
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                                >
                                  {result.title || result.url}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {result.url}
                                </p>
                                {result.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {result.description}
                                  </p>
                                )}
                              </div>
                              {isMatched && (
                                <Badge variant="success">Your Site</Badge>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}

