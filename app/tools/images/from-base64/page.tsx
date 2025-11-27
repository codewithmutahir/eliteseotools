"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImagePreview } from "@/components/ImagePreview"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function Base64ToImagePage() {
  const [base64Input, setBase64Input] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [error, setError] = useState<string>("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleDecode = () => {
    setError("")
    try {
      // Check if it's a valid base64 image string
      if (!base64Input.trim()) {
        setError("Please enter a Base64 string")
        return
      }

      let base64String = base64Input.trim()
      
      // If it doesn't have data URI prefix, add it
      if (!base64String.startsWith("data:image")) {
        base64String = `data:image/png;base64,${base64String}`
      }

      setPreview(base64String)
    } catch (err) {
      setError("Invalid Base64 string")
    }
  }

  const handleDownload = () => {
    if (!preview) return
    
    requireAuth(() => {
      try {
        const mimeMatch = preview.match(/data:([^;]+);/)
        const mimeType = mimeMatch ? mimeMatch[1] : "image/png"
        const extension = mimeType.split("/")[1] || "png"
        
        const blob = imageUtils.base64ToBlob(preview, mimeType)
        imageUtils.downloadFile(blob, `decoded-image.${extension}`)
      } catch (err) {
        alert("Failed to download image")
      }
    })
  }

  const handleReset = () => {
    setBase64Input("")
    setPreview("")
    setError("")
  }

  return (
    <ToolLayout
      title="Base64 to Image"
      description="Convert a Base64 encoded string back to an image file."
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Base64 String (with or without data URI prefix)
          </label>
          <Textarea
            placeholder="Paste your Base64 string here..."
            value={base64Input}
            onChange={(e) => setBase64Input(e.target.value)}
            rows={8}
            className="resize-none font-mono text-xs"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDecode} disabled={!base64Input.trim()}>
            Decode to Image
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

        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <ImagePreview src={preview} alt="Decoded" title="Decoded Image" />
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </motion.div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </ToolLayout>
  )
}

