"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function FindReplacePage() {
  const [inputText, setInputText] = useState("")
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)

  const handleReplace = () => {
    const result = textUtils.findAndReplace(inputText, findText, replaceText, caseSensitive)
    setOutputText(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  const handleReset = () => {
    setInputText("")
    setFindText("")
    setReplaceText("")
    setOutputText("")
  }

  return (
    <ToolLayout
      title="Find & Replace Tool"
      description="Find and replace text with support for case-sensitive matching."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter your text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Find</label>
            <Input
              placeholder="Text to find..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Replace With</label>
            <Input
              placeholder="Replacement text..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="caseSensitive"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="caseSensitive" className="text-sm">Case sensitive</label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleReplace} disabled={!inputText.trim() || !findText}>
            Find & Replace
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
              <label className="text-sm font-medium">Output</label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={outputText}
              readOnly
              rows={8}
              className="resize-none bg-muted"
            />
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

