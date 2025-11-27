"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function Base64Page() {
  const [inputText, setInputText] = useState("")
  const [encodedText, setEncodedText] = useState("")
  const [decodedText, setDecodedText] = useState("")

  const handleEncode = () => {
    try {
      const result = btoa(inputText)
      setEncodedText(result)
      setDecodedText("")
    } catch (error) {
      alert("Error encoding text")
    }
  }

  const handleDecode = () => {
    try {
      const result = atob(inputText)
      setDecodedText(result)
      setEncodedText("")
    } catch (error) {
      alert("Invalid Base64 string")
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleReset = () => {
    setInputText("")
    setEncodedText("")
    setDecodedText("")
  }

  return (
    <ToolLayout
      title="Base64 Encode / Decode"
      description="Encode text to Base64 or decode Base64 strings back to plain text."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to encode or Base64 string to decode..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleEncode} disabled={!inputText.trim()}>
            Encode to Base64
          </Button>
          <Button onClick={handleDecode} disabled={!inputText.trim()}>
            Decode from Base64
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {encodedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Encoded Base64</label>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(encodedText)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={encodedText}
              readOnly
              rows={6}
              className="resize-none bg-muted font-mono text-xs"
            />
          </motion.div>
        )}

        {decodedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Decoded Text</label>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(decodedText)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={decodedText}
              readOnly
              rows={6}
              className="resize-none bg-muted"
            />
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

