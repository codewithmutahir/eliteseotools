"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function GrammarCheckerPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleCheck = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to check")
      return
    }

    setLoading(true)
    setError("")
    setOutputText("")

    try {
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check grammar")
      }

      setOutputText(data.result)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!outputText) return
    requireAuth(() => {
      navigator.clipboard.writeText(outputText)
      alert("Text copied to clipboard!")
    })
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setError("")
  }

  return (
    <ToolLayout
      title="Grammar Checker"
      description="Check your text for grammar, spelling, and punctuation errors with AI-powered analysis."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to check for grammar errors..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
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
                Checking...
              </>
            ) : (
              "Check Grammar"
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Analysis Result</label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
              {outputText}
            </div>
          </motion.div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </ToolLayout>
  )
}

