"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function RemoveSpacesPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const handleRemove = () => {
    const result = textUtils.removeExtraSpaces(inputText)
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
      title="Remove Extra Spaces"
      description="Remove extra spaces from your text, leaving only single spaces between words."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text with extra spaces..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleRemove} disabled={!inputText.trim()}>
            Remove Extra Spaces
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

