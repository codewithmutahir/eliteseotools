"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function PDFCompressPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [compressedPdf, setCompressedPdf] = useState<string>("")
  const [stats, setStats] = useState<any>(null)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setCompressedPdf("")
    setStats(null)
  }

  const handleCompress = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Compression failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setCompressedPdf(url)

      const originalSize = parseInt(response.headers.get("X-Original-Size") || "0")
      const compressedSize = parseInt(response.headers.get("X-Compressed-Size") || "0")
      const savings = response.headers.get("X-Savings")

      setStats({
        originalSize: imageUtils.formatFileSize(originalSize),
        compressedSize: imageUtils.formatFileSize(compressedSize),
        savings: savings + "%",
      })
    } catch (error) {
      alert("Failed to compress PDF")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!compressedPdf) return
    requireAuth(() => {
      fetch(compressedPdf)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `compressed-${file?.name}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setCompressedPdf("")
    setStats(null)
  }

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size by optimizing internal structure."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "application/pdf": [".pdf"] }}
          maxSize={50 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {file && (
          <div className="flex gap-2">
            <Button onClick={handleCompress} disabled={loading}>
              {loading ? "Compressing..." : "Compress PDF"}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        )}

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{stats.originalSize}</div>
                  <div className="text-xs text-muted-foreground">Original</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.compressedSize}</div>
                  <div className="text-xs text-muted-foreground">Compressed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">{stats.savings}</div>
                  <div className="text-xs text-muted-foreground">Saved</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {compressedPdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium mb-4">
                ✓ PDF compressed successfully!
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Compressed PDF
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

