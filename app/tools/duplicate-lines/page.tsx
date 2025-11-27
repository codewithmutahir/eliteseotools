"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function DuplicateLinesPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const handleRemove = () => {
    const result = textUtils.removeDuplicateLines(inputText)
    setOutputText(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from your text, keeping only unique lines."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text with duplicate lines..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleRemove} disabled={!inputText.trim()}>
            Remove Duplicates
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {outputText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Output (Unique Lines)</label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={outputText}
              readOnly
              rows={10}
              className="resize-none bg-muted"
            />
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

