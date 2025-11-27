"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Upload, X, Image as ImageIcon } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function ImagesToPDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [pdfResult, setPdfResult] = useState<string>("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
    setPdfResult("")
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("files", file))

      const response = await fetch("/api/pdf/images-to-pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Conversion failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPdfResult(url)
    } catch (error) {
      alert("Failed to convert images to PDF")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!pdfResult) return
    requireAuth(() => {
      fetch(pdfResult)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, "images.pdf")
        })
    })
  }

  const handleReset = () => {
    setFiles([])
    setPdfResult("")
  }

  return (
    <ToolLayout
      title="Images to PDF"
      description="Convert multiple images into a single PDF document."
    >
      <div className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">
            {isDragActive ? "Drop images here..." : "Drag & drop images here"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            or click to select files (JPG, PNG, WebP)
          </p>
        </div>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">
              Selected Images ({files.length})
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {imageUtils.formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-destructive/10 rounded"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleConvert} disabled={loading || files.length === 0}>
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {pdfResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium mb-4">
                ✓ PDF created successfully from {files.length} image(s)!
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
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

