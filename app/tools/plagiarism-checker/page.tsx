"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function PlagiarismCheckerPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheck = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to check")
      return
    }

    setLoading(true)
    setError("")
    setOutputText("")

    try {
      const response = await fetch("/api/plagiarism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check for plagiarism")
      }

      setOutputText(data.result)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setError("")
  }

  return (
    <ToolLayout
      title="AI Plagiarism Checker"
      description="Detect potential plagiarism by analyzing writing style consistency, vocabulary patterns, and suspicious phrases."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to check for plagiarism..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {inputText.length} / 5000 characters
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCheck} disabled={loading || !inputText.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Check for Plagiarism"
            )}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-destructive/10 text-destructive rounded-md"
          >
            {error}
          </motion.div>
        )}

        {outputText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">Analysis Result</label>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
              {outputText}
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

