"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search, AlertCircle, CheckCircle2, TrendingUp, TrendingDown, Link2, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"
import type { DomainAuthorityMetrics } from "@/lib/dataforseo"

interface DomainAuthorityResult extends DomainAuthorityMetrics {
  cache_used?: boolean
  cache_timestamp?: number
}

export default function DomainAuthorityPage() {
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<DomainAuthorityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleCheck = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain")
      return
    }

    // Validate domain format (basic check, server will do full validation)
    const cleaned = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .split('/')[0]
    
    if (cleaned.length < 4) {
      setError("Please enter a valid domain (e.g., example.com)")
      return
    }

    // Check authentication before making API call
    requireAuth(async () => {
      setLoading(true)
      setError("")
      setResult(null)

      try {
        const response = await fetch("/api/domain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain: domain.trim() }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to check domain authority")
        }

        setResult(data.data)
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    })
  }

  const handleReset = () => {
    setDomain("")
    setResult(null)
    setError("")
  }

  const formatNumber = (num?: number): string => {
    if (num === undefined || num === null) return "N/A"
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "N/A"
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <ToolLayout
      title="Domain Authority Checker"
      description="Check domain authority, backlinks, and referring domains for any website. Similar to MozBar metrics powered by DataForSEO."
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Domain Name
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading && domain.trim()) {
                    handleCheck()
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleCheck}
                disabled={loading || !domain.trim()}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check
                  </>
                )}
              </Button>
              {domain && (
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter a domain without protocol (e.g., example.com, google.com)
            </p>
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-destructive/10 text-destructive rounded-md flex items-start gap-2"
            >
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Cache Indicator */}
              {result.cache_used && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    Cached result from {formatDate(result.cache_timestamp)}
                  </span>
                </div>
              )}

              {/* Main Metrics Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        {result.domain}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Domain Authority Metrics
                      </CardDescription>
                    </div>
                    {result.last_updated && (
                      <div className="text-xs text-muted-foreground">
                        Updated: {formatDate(result.last_updated)}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Domain Rank */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Domain Rank
                        </span>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">
                        {result.domain_rank !== undefined
                          ? formatNumber(result.domain_rank)
                          : "N/A"}
                      </p>
                    </div>

                    {/* Total Backlinks */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Total Backlinks
                        </span>
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">
                        {formatNumber(result.backlinks_total)}
                      </p>
                    </div>

                    {/* Referring Domains */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Referring Domains
                        </span>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">
                        {formatNumber(result.referring_domains)}
                      </p>
                    </div>

                    {/* New Links (30 days) */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          New Links (30d)
                        </span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {formatNumber(result.new_links_30d)}
                      </p>
                    </div>

                    {/* Lost Links (30 days) */}
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Lost Links (30d)
                        </span>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-2xl font-bold text-red-600">
                        {formatNumber(result.lost_links_30d)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </ToolLayout>
  )
}

