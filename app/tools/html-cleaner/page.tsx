"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function HTMLCleanerPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const handleClean = () => {
    const result = textUtils.stripHTML(inputText)
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
      title="HTML Cleaner"
      description="Remove all HTML tags from your text, leaving only plain text content."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input HTML</label>
          <Textarea
            placeholder="Enter HTML to clean..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none font-mono text-xs"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleClean} disabled={!inputText.trim()}>
            Strip HTML Tags
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
              <label className="text-sm font-medium">Plain Text Output</label>
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

