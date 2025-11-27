/**
 * Plagiarism Detection Utilities
 * 
 * Provides algorithms for text analysis, similarity detection,
 * and plagiarism risk assessment.
 */

// Common English stopwords to filter out
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
  'she', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where',
  'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'just', 'also', 'now', 'here',
  'there', 'then', 'once', 'if', 'else', 'while', 'although', 'though',
  'because', 'unless', 'until', 'about', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'under', 'again',
])

/**
 * Normalize text for comparison
 * - Lowercase
 * - Remove punctuation
 * - Normalize whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Tokenize text into words, optionally removing stopwords
 */
export function tokenize(text: string, removeStopwords = true): string[] {
  const normalized = normalizeText(text)
  const words = normalized.split(' ').filter(w => w.length > 0)
  
  if (removeStopwords) {
    return words.filter(w => !STOPWORDS.has(w) && w.length > 2)
  }
  return words
}

/**
 * Generate n-grams from text
 * N-grams are contiguous sequences of n words
 */
export function generateNgrams(text: string, n: number = 3): string[] {
  const words = tokenize(text, false)
  const ngrams: string[] = []
  
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '))
  }
  
  return ngrams
}

/**
 * Generate word shingles (character-based n-grams)
 * Useful for detecting minor text modifications
 */
export function generateShingles(text: string, k: number = 5): Set<string> {
  const normalized = normalizeText(text).replace(/\s/g, '')
  const shingles = new Set<string>()
  
  for (let i = 0; i <= normalized.length - k; i++) {
    shingles.add(normalized.substring(i, i + k))
  }
  
  return shingles
}

/**
 * Simple hash function for fingerprinting
 */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Generate document fingerprint using winnowing algorithm
 * Creates a compact representation for fast comparison
 */
export function generateFingerprint(text: string, windowSize: number = 4): number[] {
  const shingles = Array.from(generateShingles(text, 5))
  const hashes = shingles.map(s => simpleHash(s))
  const fingerprint: number[] = []
  
  for (let i = 0; i <= hashes.length - windowSize; i++) {
    const window = hashes.slice(i, i + windowSize)
    fingerprint.push(Math.min(...window))
  }
  
  return [...new Set(fingerprint)]
}

/**
 * Calculate Jaccard similarity between two sets
 * Returns value between 0 (no overlap) and 1 (identical)
 */
export function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  
  if (union.size === 0) return 0
  return intersection.size / union.size
}

/**
 * Calculate Levenshtein distance between two strings
 * Lower distance = more similar
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length
  const n = str2.length
  
  if (m === 0) return n
  if (n === 0) return m
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
  
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      )
    }
  }
  
  return dp[m][n]
}

/**
 * Calculate normalized Levenshtein similarity (0-1)
 */
export function levenshteinSimilarity(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length)
  if (maxLen === 0) return 1
  return 1 - levenshteinDistance(str1, str2) / maxLen
}

/**
 * Jaro-Winkler similarity algorithm
 * Gives higher scores to strings that match from the beginning
 */
export function jaroWinklerSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1
  
  const len1 = str1.length
  const len2 = str2.length
  
  if (len1 === 0 || len2 === 0) return 0
  
  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1
  const str1Matches = new Array(len1).fill(false)
  const str2Matches = new Array(len2).fill(false)
  
  let matches = 0
  let transpositions = 0
  
  // Find matches
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance)
    const end = Math.min(i + matchDistance + 1, len2)
    
    for (let j = start; j < end; j++) {
      if (str2Matches[j] || str1[i] !== str2[j]) continue
      str1Matches[i] = true
      str2Matches[j] = true
      matches++
      break
    }
  }
  
  if (matches === 0) return 0
  
  // Count transpositions
  let k = 0
  for (let i = 0; i < len1; i++) {
    if (!str1Matches[i]) continue
    while (!str2Matches[k]) k++
    if (str1[i] !== str2[k]) transpositions++
    k++
  }
  
  const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3
  
  // Jaro-Winkler adjustment
  let prefix = 0
  for (let i = 0; i < Math.min(4, Math.min(len1, len2)); i++) {
    if (str1[i] === str2[i]) prefix++
    else break
  }
  
  return jaro + prefix * 0.1 * (1 - jaro)
}

/**
 * Analyze text for suspicious patterns
 */
export interface SuspiciousPhrase {
  text: string
  startIndex: number
  endIndex: number
  reason: string
  severity: 'low' | 'medium' | 'high'
  suggestion?: string
}

/**
 * Common phrases that might indicate copied content
 */
const SUSPICIOUS_PATTERNS = [
  { pattern: /according to (?:recent )?(?:studies|research|experts)/gi, reason: 'Generic citation without source', severity: 'medium' as const },
  { pattern: /it is (?:widely|generally|commonly) (?:known|accepted|believed)/gi, reason: 'Unattributed common knowledge claim', severity: 'low' as const },
  { pattern: /(?:studies|research) (?:has |have )?shown that/gi, reason: 'Vague research reference', severity: 'medium' as const },
  { pattern: /in (?:recent|modern) (?:years|times|decades)/gi, reason: 'Generic time reference often found in copied content', severity: 'low' as const },
  { pattern: /(?:the|a) (?:significant|substantial|considerable) (?:amount|number|body) of/gi, reason: 'Formal academic phrasing', severity: 'low' as const },
  { pattern: /it (?:is|has been) (?:argued|suggested|proposed) that/gi, reason: 'Passive voice hiding source', severity: 'medium' as const },
  { pattern: /(?:furthermore|moreover|additionally|consequently|therefore|thus|hence)/gi, reason: 'Academic transition word', severity: 'low' as const },
  { pattern: /\b(?:plethora|myriad|multitude|plethora)\b/gi, reason: 'Overly formal vocabulary', severity: 'low' as const },
  { pattern: /in (?:order )?to (?:fully )?understand/gi, reason: 'Common textbook phrasing', severity: 'low' as const },
  { pattern: /(?:this|the) (?:essay|paper|article|study) (?:will|aims to|seeks to)/gi, reason: 'Academic introduction pattern', severity: 'medium' as const },
]

/**
 * Detect suspicious phrases in text
 */
export function detectSuspiciousPhrases(text: string): SuspiciousPhrase[] {
  const suspicious: SuspiciousPhrase[] = []
  
  for (const { pattern, reason, severity } of SUSPICIOUS_PATTERNS) {
    let match
    const regex = new RegExp(pattern.source, pattern.flags)
    
    while ((match = regex.exec(text)) !== null) {
      suspicious.push({
        text: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        reason,
        severity,
      })
    }
  }
  
  return suspicious.sort((a, b) => a.startIndex - b.startIndex)
}

/**
 * Analyze writing style consistency
 */
export interface StyleAnalysis {
  avgSentenceLength: number
  vocabularyRichness: number
  formalityScore: number
  consistencyScore: number
  styleShifts: { position: number; description: string }[]
}

export function analyzeWritingStyle(text: string): StyleAnalysis {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = tokenize(text, false)
  const uniqueWords = new Set(tokenize(text, true))
  
  // Calculate sentence lengths
  const sentenceLengths = sentences.map(s => tokenize(s, false).length)
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length || 0
  
  // Vocabulary richness (type-token ratio)
  const vocabularyRichness = words.length > 0 ? uniqueWords.size / words.length : 0
  
  // Formality score based on formal word usage
  const formalWords = ['therefore', 'however', 'furthermore', 'consequently', 'moreover', 'nevertheless', 'notwithstanding', 'aforementioned', 'henceforth', 'whereby']
  const formalCount = words.filter(w => formalWords.includes(w.toLowerCase())).length
  const formalityScore = Math.min(1, formalCount / (words.length / 100))
  
  // Detect style shifts (significant changes in sentence length)
  const styleShifts: { position: number; description: string }[] = []
  for (let i = 1; i < sentenceLengths.length; i++) {
    const diff = Math.abs(sentenceLengths[i] - sentenceLengths[i - 1])
    if (diff > avgSentenceLength * 1.5) {
      styleShifts.push({
        position: i,
        description: `Sentence length changed from ${sentenceLengths[i - 1]} to ${sentenceLengths[i]} words`
      })
    }
  }
  
  // Calculate consistency score
  const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgSentenceLength, 2), 0) / sentenceLengths.length
  const stdDev = Math.sqrt(variance)
  const consistencyScore = Math.max(0, 1 - (stdDev / avgSentenceLength) * 0.5)
  
  return {
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    vocabularyRichness: Math.round(vocabularyRichness * 100) / 100,
    formalityScore: Math.round(formalityScore * 100) / 100,
    consistencyScore: Math.round(consistencyScore * 100) / 100,
    styleShifts
  }
}

/**
 * Main plagiarism analysis result interface
 */
export interface PlagiarismResult {
  overallScore: number // 0-100, higher = more likely plagiarized
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
}

/**
 * Perform comprehensive plagiarism analysis
 */
export function analyzePlagiarism(text: string): PlagiarismResult {
  // Generate n-grams for analysis
  const ngrams = generateNgrams(text, 3)
  const uniqueNgrams = new Set(ngrams)
  const repetitionRate = ngrams.length > 0 ? 1 - (uniqueNgrams.size / ngrams.length) : 0
  
  // Detect suspicious phrases
  const suspiciousPhrases = detectSuspiciousPhrases(text)
  
  // Analyze writing style
  const styleAnalysis = analyzeWritingStyle(text)
  
  // Calculate overall score
  let score = 0
  
  // Add points for suspicious phrases
  const highSeverity = suspiciousPhrases.filter(p => p.severity === 'high').length
  const mediumSeverity = suspiciousPhrases.filter(p => p.severity === 'medium').length
  const lowSeverity = suspiciousPhrases.filter(p => p.severity === 'low').length
  
  score += highSeverity * 15
  score += mediumSeverity * 8
  score += lowSeverity * 3
  
  // Add points for style inconsistency
  score += (1 - styleAnalysis.consistencyScore) * 20
  
  // Add points for style shifts
  score += styleAnalysis.styleShifts.length * 5
  
  // Add points for high formality (often indicates copied academic text)
  score += styleAnalysis.formalityScore * 15
  
  // Cap score at 100
  score = Math.min(100, Math.round(score))
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' | 'very-high'
  if (score < 20) riskLevel = 'low'
  else if (score < 45) riskLevel = 'medium'
  else if (score < 70) riskLevel = 'high'
  else riskLevel = 'very-high'
  
  // Generate summary
  const summaryParts: string[] = []
  if (suspiciousPhrases.length > 0) {
    summaryParts.push(`Found ${suspiciousPhrases.length} potentially suspicious phrase(s)`)
  }
  if (styleAnalysis.styleShifts.length > 0) {
    summaryParts.push(`Detected ${styleAnalysis.styleShifts.length} writing style shift(s)`)
  }
  if (styleAnalysis.consistencyScore < 0.6) {
    summaryParts.push('Writing style shows inconsistencies')
  }
  if (styleAnalysis.formalityScore > 0.5) {
    summaryParts.push('Text contains highly formal academic language')
  }
  
  const summary = summaryParts.length > 0 
    ? summaryParts.join('. ') + '.'
    : 'No significant plagiarism indicators detected.'
  
  // Generate recommendations
  const recommendations: string[] = []
  if (riskLevel !== 'low') {
    recommendations.push('Consider rephrasing highlighted sections in your own words')
    if (suspiciousPhrases.some(p => p.reason.includes('citation'))) {
      recommendations.push('Add proper citations for referenced studies or research')
    }
    if (styleAnalysis.styleShifts.length > 2) {
      recommendations.push('Review the text for consistency in writing style')
    }
    if (styleAnalysis.formalityScore > 0.5) {
      recommendations.push('Consider using more natural, conversational language')
    }
  }
  
  return {
    overallScore: score,
    riskLevel,
    suspiciousPhrases,
    styleAnalysis,
    ngramAnalysis: {
      totalNgrams: ngrams.length,
      uniqueNgrams: uniqueNgrams.size,
      repetitionRate: Math.round(repetitionRate * 100) / 100
    },
    summary,
    recommendations
  }
}

/**
 * Compare two texts for similarity
 */
export function compareTexts(text1: string, text2: string): {
  jaccardSimilarity: number
  ngramOverlap: number
  fingerprintSimilarity: number
  overallSimilarity: number
} {
  // Jaccard similarity on word sets
  const words1 = new Set(tokenize(text1))
  const words2 = new Set(tokenize(text2))
  const jaccard = jaccardSimilarity(words1, words2)
  
  // N-gram overlap
  const ngrams1 = new Set(generateNgrams(text1, 3))
  const ngrams2 = new Set(generateNgrams(text2, 3))
  const ngramOverlap = jaccardSimilarity(ngrams1, ngrams2)
  
  // Fingerprint similarity
  const fp1 = new Set(generateFingerprint(text1).map(String))
  const fp2 = new Set(generateFingerprint(text2).map(String))
  const fingerprintSim = jaccardSimilarity(fp1, fp2)
  
  // Weighted overall similarity
  const overallSimilarity = (jaccard * 0.3 + ngramOverlap * 0.5 + fingerprintSim * 0.2)
  
  return {
    jaccardSimilarity: Math.round(jaccard * 100) / 100,
    ngramOverlap: Math.round(ngramOverlap * 100) / 100,
    fingerprintSimilarity: Math.round(fingerprintSim * 100) / 100,
    overallSimilarity: Math.round(overallSimilarity * 100) / 100
  }
}

