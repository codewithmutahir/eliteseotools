"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw } from "lucide-react"
import { textUtils } from "@/lib/textUtils"
import { motion } from "framer-motion"

export default function URLEncoderPage() {
  const [inputText, setInputText] = useState("")
  const [encodedText, setEncodedText] = useState("")
  const [decodedText, setDecodedText] = useState("")

  const handleEncode = () => {
    const result = textUtils.encodeURL(inputText)
    setEncodedText(result)
    setDecodedText("")
  }

  const handleDecode = () => {
    const result = textUtils.decodeURL(inputText)
    setDecodedText(result)
    setEncodedText("")
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
      title="URL Encoder / Decoder"
      description="Encode or decode URL strings for safe transmission over the internet."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text / URL</label>
          <Textarea
            placeholder="Enter text or URL to encode/decode..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleEncode} disabled={!inputText.trim()}>
            Encode
          </Button>
          <Button onClick={handleDecode} disabled={!inputText.trim()}>
            Decode
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
              <label className="text-sm font-medium">Encoded URL</label>
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
              <label className="text-sm font-medium">Decoded URL</label>
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

