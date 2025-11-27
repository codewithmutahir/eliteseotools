"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function PDFWatermarkPage() {
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()
  const [file, setFile] = useState<File | null>(null)
  const [watermarkText, setWatermarkText] = useState<string>("")
  const [opacity, setOpacity] = useState<number>(30)
  const [loading, setLoading] = useState(false)
  const [watermarkedPdf, setWatermarkedPdf] = useState<string>("")

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setWatermarkedPdf("")
  }

  const handleAddWatermark = async () => {
    if (!file || !watermarkText) {
      alert("Please upload a PDF and enter watermark text")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("text", watermarkText)
      formData.append("opacity", (opacity / 100).toString())

      const response = await fetch("/api/pdf/watermark", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Watermark failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setWatermarkedPdf(url)
    } catch (error) {
      alert("Failed to add watermark")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!watermarkedPdf) return
    requireAuth(() => {
      fetch(watermarkedPdf)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `watermarked-${file?.name}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setWatermarkText("")
    setWatermarkedPdf("")
    setOpacity(30)
  }

  return (
    <ToolLayout
      title="Add Watermark to PDF"
      description="Add a text watermark to all pages of your PDF document."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "application/pdf": [".pdf"] }}
          maxSize={20 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {file && (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Watermark Text</label>
                <Input
                  placeholder="Enter watermark text..."
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Opacity: {opacity}%</label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddWatermark} disabled={loading || !watermarkText}>
                {loading ? "Adding Watermark..." : "Add Watermark"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </>
        )}

        {watermarkedPdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium mb-4">
                ✓ Watermark added successfully!
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Watermarked PDF
              </Button>
            </div>
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

