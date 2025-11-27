"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function ImageToBase64Page() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [base64, setBase64] = useState<string>("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64String = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64String)
    setBase64(base64String)
  }

  const handleCopy = () => {
    if (!base64) return
    requireAuth(() => {
      navigator.clipboard.writeText(base64)
      alert("Base64 string copied to clipboard!")
    })
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setBase64("")
  }

  return (
    <ToolLayout
      title="Image to Base64"
      description="Convert any image file to a Base64 encoded string for embedding in HTML/CSS."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif"] }}
          maxSize={5 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {preview && (
          <>
            <ImagePreview src={preview} alt="Preview" title="Image Preview" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Base64 String</label>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={base64}
                readOnly
                rows={8}
                className="resize-none font-mono text-xs bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Length: {base64.length.toLocaleString()} characters
              </p>
            </motion.div>

            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </>
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

