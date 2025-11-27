"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function TextCasePage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [currentCase, setCurrentCase] = useState("")

  const handleConvert = (type: string) => {
    let result = ""
    switch (type) {
      case "upper":
        result = textUtils.toUpperCase(inputText)
        setCurrentCase("UPPERCASE")
        break
      case "lower":
        result = textUtils.toLowerCase(inputText)
        setCurrentCase("lowercase")
        break
      case "capitalized":
        result = textUtils.toCapitalizedCase(inputText)
        setCurrentCase("Capitalized Case")
        break
      case "sentence":
        result = textUtils.toSentenceCase(inputText)
        setCurrentCase("Sentence case")
        break
    }
    setOutputText(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Convert text between different cases: uppercase, lowercase, capitalized case, and sentence case."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to convert..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={() => handleConvert("upper")} disabled={!inputText.trim()}>
            UPPERCASE
          </Button>
          <Button onClick={() => handleConvert("lower")} disabled={!inputText.trim()}>
            lowercase
          </Button>
          <Button onClick={() => handleConvert("capitalized")} disabled={!inputText.trim()}>
            Capitalized Case
          </Button>
          <Button onClick={() => handleConvert("sentence")} disabled={!inputText.trim()}>
            Sentence case
          </Button>
        </div>

        {outputText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Output ({currentCase})</label>
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

