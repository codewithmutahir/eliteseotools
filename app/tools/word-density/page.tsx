"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function WordDensityPage() {
  const [inputText, setInputText] = useState("")
  const [results, setResults] = useState<Array<{ word: string; count: number; density: number }>>([])

  const handleAnalyze = () => {
    const analysis = textUtils.analyzeWordDensity(inputText)
    setResults(analysis)
  }

  const handleReset = () => {
    setInputText("")
    setResults([])
  }

  return (
    <ToolLayout
      title="Word Density Analyzer"
      description="Analyze keyword density and frequency in your text. Shows the most common words and their usage percentage."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to analyze word density..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAnalyze} disabled={!inputText.trim()}>
            Analyze Word Density
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">Top Keywords (showing top 20)</label>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">#</th>
                    <th className="text-left p-3 font-medium">Word</th>
                    <th className="text-center p-3 font-medium">Count</th>
                    <th className="text-center p-3 font-medium">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-3 text-muted-foreground">{index + 1}</td>
                      <td className="p-3 font-medium">{item.word}</td>
                      <td className="p-3 text-center">{item.count}</td>
                      <td className="p-3 text-center">{item.density}%</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

