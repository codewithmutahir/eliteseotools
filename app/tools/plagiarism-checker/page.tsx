"use client"

import { useState, useMemo } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Loader2, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  TrendingUp,
  FileText,
  Sparkles,
  Copy,
  Check
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Types matching our API response
interface SuspiciousPhrase {
  text: string
  startIndex: number
  endIndex: number
  reason: string
  severity: 'low' | 'medium' | 'high'
  suggestion?: string
}

interface StyleAnalysis {
  avgSentenceLength: number
  vocabularyRichness: number
  formalityScore: number
  consistencyScore: number
  styleShifts: { position: number; description: string }[]
}

interface PlagiarismResult {
  overallScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'very-high'
  suspiciousPhrases: SuspiciousPhrase[]
  styleAnalysis: StyleAnalysis
  ngramAnalysis: {
    totalNgrams: number
    uniqueNgrams: number
    repetitionRate: number
  }
  summary: string
  recommendations: string[]
  aiAnalysis?: {
    additionalInsights: string
    rephrasingSuggestions: { original: string; suggestion: string }[]
  }
}

// Animated circular progress component
function CircularProgress({ 
  value, 
  size = 160, 
  strokeWidth = 12,
  riskLevel 
}: { 
  value: number
  size?: number
  strokeWidth?: number
  riskLevel: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  const colors = {
    'low': { stroke: '#22c55e', bg: '#dcfce7', text: '#166534' },
    'medium': { stroke: '#eab308', bg: '#fef9c3', text: '#854d0e' },
    'high': { stroke: '#f97316', bg: '#ffedd5', text: '#9a3412' },
    'very-high': { stroke: '#ef4444', bg: '#fee2e2', text: '#991b1b' },
  }

  const color = colors[riskLevel as keyof typeof colors] || colors.medium

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span 
          className="text-4xl font-bold"
          style={{ color: color.text }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {value}%
        </motion.span>
        <span className="text-sm text-muted-foreground capitalize">
          {riskLevel.replace('-', ' ')} Risk
        </span>
      </div>
    </div>
  )
}

// Highlighted text component
function HighlightedText({ 
  text, 
  phrases,
  onPhraseClick
}: { 
  text: string
  phrases: SuspiciousPhrase[]
  onPhraseClick: (phrase: SuspiciousPhrase) => void
}) {
  const segments = useMemo(() => {
    if (phrases.length === 0) return [{ text, highlight: null }]
    
    const result: { text: string; highlight: SuspiciousPhrase | null }[] = []
    let lastIndex = 0
    
    // Sort phrases by start index
    const sortedPhrases = [...phrases].sort((a, b) => a.startIndex - b.startIndex)
    
    for (const phrase of sortedPhrases) {
      // Add non-highlighted text before this phrase
      if (phrase.startIndex > lastIndex) {
        result.push({ 
          text: text.slice(lastIndex, phrase.startIndex), 
          highlight: null 
        })
      }
      
      // Add highlighted phrase
      result.push({ 
        text: text.slice(phrase.startIndex, phrase.endIndex), 
        highlight: phrase 
      })
      
      lastIndex = phrase.endIndex
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), highlight: null })
    }
    
    return result
  }, [text, phrases])

  const severityColors = {
    low: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
    medium: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
    high: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
  }

  return (
    <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap leading-relaxed">
      {segments.map((segment, i) => (
        segment.highlight ? (
          <span
            key={i}
            className={`cursor-pointer border-b-2 px-0.5 rounded transition-all hover:opacity-80 ${severityColors[segment.highlight.severity]}`}
            onClick={() => onPhraseClick(segment.highlight!)}
            title={segment.highlight.reason}
          >
            {segment.text}
          </span>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      ))}
    </div>
  )
}

// Stat card component
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  description,
  color = "text-primary"
}: { 
  icon: any
  label: string
  value: string | number
  description?: string
  color?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-card rounded-lg border"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </motion.div>
  )
}

export default function PlagiarismCheckerPage() {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState<PlagiarismResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedPhrase, setSelectedPhrase] = useState<SuspiciousPhrase | null>(null)
  const [copiedSuggestion, setCopiedSuggestion] = useState<string | null>(null)

  const handleCheck = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to check")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setSelectedPhrase(null)

    try {
      const response = await fetch("/api/plagiarism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, includeAI: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check for plagiarism")
      }

      setResult(data.result)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setInputText("")
    setResult(null)
    setError("")
    setSelectedPhrase(null)
  }

  const handleCopySuggestion = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedSuggestion(text)
    setTimeout(() => setCopiedSuggestion(null), 2000)
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'medium': return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'very-high': return <AlertTriangle className="h-5 w-5 text-red-500" />
      default: return null
    }
  }

  return (
    <ToolLayout
      title="AI Plagiarism Checker"
      description="Advanced plagiarism detection using n-gram analysis, style consistency checks, and AI-powered insights."
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Paste or type the text you want to check for plagiarism..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none font-mono text-sm"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              {inputText.length.toLocaleString()} / 10,000 characters
            </p>
            <p className="text-xs text-muted-foreground">
              ~{inputText.split(/\s+/).filter(Boolean).length.toLocaleString()} words
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleCheck} 
            disabled={loading || !inputText.trim()}
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Check for Plagiarism
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReset} size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="h-5 w-5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              {/* Main Score Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Progress */}
                    <CircularProgress 
                      value={result.overallScore} 
                      riskLevel={result.riskLevel}
                    />
                    
                    {/* Summary */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                        {getRiskIcon(result.riskLevel)}
                        <h3 className="text-xl font-semibold capitalize">
                          {result.riskLevel.replace('-', ' ')} Plagiarism Risk
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {result.summary}
                      </p>
                      
                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="px-3 py-1 bg-muted rounded-full">
                          {result.suspiciousPhrases.length} suspicious phrase(s)
                        </span>
                        <span className="px-3 py-1 bg-muted rounded-full">
                          {result.styleAnalysis.styleShifts.length} style shift(s)
                        </span>
                        <span className="px-3 py-1 bg-muted rounded-full">
                          {Math.round(result.styleAnalysis.consistencyScore * 100)}% consistency
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={FileText}
                  label="Avg Sentence Length"
                  value={`${result.styleAnalysis.avgSentenceLength} words`}
                  color="text-blue-500"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Vocabulary Richness"
                  value={`${Math.round(result.styleAnalysis.vocabularyRichness * 100)}%`}
                  description="Unique words ratio"
                  color="text-green-500"
                />
                <StatCard
                  icon={AlertTriangle}
                  label="Formality Score"
                  value={`${Math.round(result.styleAnalysis.formalityScore * 100)}%`}
                  description="Academic language usage"
                  color="text-orange-500"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Style Consistency"
                  value={`${Math.round(result.styleAnalysis.consistencyScore * 100)}%`}
                  description="Writing uniformity"
                  color="text-purple-500"
                />
              </div>

              {/* Highlighted Text with Suspicious Phrases */}
              {result.suspiciousPhrases.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Suspicious Phrases Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click on highlighted text to see details and suggestions.
                    </p>
                    <HighlightedText
                      text={inputText}
                      phrases={result.suspiciousPhrases}
                      onPhraseClick={setSelectedPhrase}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Selected Phrase Details */}
              <AnimatePresence>
                {selectedPhrase && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-orange-500" />
                              Phrase Analysis
                            </h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {selectedPhrase.severity} severity
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPhrase(null)}
                          >
                            Dismiss
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Original Text:</p>
                            <p className="p-2 bg-background rounded border text-sm">
                              "{selectedPhrase.text}"
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Why it's flagged:</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedPhrase.reason}
                            </p>
                          </div>
                          
                          {selectedPhrase.suggestion && (
                            <div>
                              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                AI Suggestion:
                              </p>
                              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-800">
                                <p className="text-sm mb-2">{selectedPhrase.suggestion}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopySuggestion(selectedPhrase.suggestion!)}
                                >
                                  {copiedSuggestion === selectedPhrase.suggestion ? (
                                    <>
                                      <Check className="mr-2 h-3 w-3" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="mr-2 h-3 w-3" />
                                      Copy Suggestion
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Insights */}
              {result.aiAnalysis?.additionalInsights && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI Analysis Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {result.aiAnalysis.additionalInsights}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {rec}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* All Suspicious Phrases List */}
              {result.suspiciousPhrases.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">All Flagged Phrases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.suspiciousPhrases.map((phrase, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedPhrase === phrase ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedPhrase(phrase)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                "{phrase.text}"
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {phrase.reason}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                              phrase.severity === 'high' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : phrase.severity === 'medium'
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {phrase.severity}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  )
}
