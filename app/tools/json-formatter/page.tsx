"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function JSONFormatterPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [error, setError] = useState("")

  const handleFormat = () => {
    const { formatted, error: err } = textUtils.formatJSON(inputText, 2)
    if (err) {
      setError(err)
      setOutputText("")
    } else {
      setOutputText(formatted)
      setError("")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  const handleReset = () => {
    setInputText("")
    setOutputText("")
    setError("")
  }

  return (
    <ToolLayout
      title="JSON Formatter / Beautifier"
      description="Format and beautify your JSON data with proper indentation."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input JSON</label>
          <Textarea
            placeholder='Enter JSON to format... e.g. {"name":"John","age":30}'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none font-mono text-xs"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFormat} disabled={!inputText.trim()}>
            Format JSON
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

        {outputText && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Formatted JSON</label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={outputText}
              readOnly
              rows={15}
              className="resize-none bg-muted font-mono text-xs"
            />
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

