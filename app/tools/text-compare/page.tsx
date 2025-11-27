"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function TextComparePage() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [result, setResult] = useState<{
    similarity: number
    differences: number
    details: string
  } | null>(null)

  const handleCompare = () => {
    const comparison = textUtils.compareTexts(text1, text2)
    setResult(comparison)
  }

  const handleReset = () => {
    setText1("")
    setText2("")
    setResult(null)
  }

  return (
    <ToolLayout
      title="Text Compare Tool"
      description="Compare two texts side-by-side and see the differences and similarity percentage."
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Text 1</label>
            <Textarea
              placeholder="Enter first text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={12}
              className="resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Text 2</label>
            <Textarea
              placeholder="Enter second text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={12}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCompare} disabled={!text1.trim() || !text2.trim()}>
            Compare Texts
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <label className="text-sm font-medium">Comparison Result</label>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{result.similarity}%</div>
                <div className="text-sm text-muted-foreground mt-1">Similarity</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{result.differences}</div>
                <div className="text-sm text-muted-foreground mt-1">Different Lines</div>
              </Card>
              <Card className="p-4 text-center flex items-center justify-center">
                <div className="text-sm text-muted-foreground">{result.details}</div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

