"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, ArrowUpAZ, ArrowDownZA } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function SortLinesPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [sortOrder, setSortOrder] = useState("")

  const handleSort = (order: "az" | "za") => {
    const result = order === "az" 
      ? textUtils.sortLinesAZ(inputText)
      : textUtils.sortLinesZA(inputText)
    setOutputText(result)
    setSortOrder(order === "az" ? "A→Z" : "Z→A")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  return (
    <ToolLayout
      title="Sort Lines"
      description="Sort lines of text alphabetically in ascending (A→Z) or descending (Z→A) order."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter lines of text to sort..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => handleSort("az")} disabled={!inputText.trim()}>
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            Sort A→Z
          </Button>
          <Button onClick={() => handleSort("za")} disabled={!inputText.trim()}>
            <ArrowDownZA className="mr-2 h-4 w-4" />
            Sort Z→A
          </Button>
        </div>

        {outputText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Output (Sorted {sortOrder})</label>
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

