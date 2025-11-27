"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Upload, X, File } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [mergedPdf, setMergedPdf] = useState<string>("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
    setMergedPdf("")
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("files", file))

      const response = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Merge failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setMergedPdf(url)
    } catch (error) {
      alert("Failed to merge PDFs")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!mergedPdf) return
    requireAuth(() => {
      fetch(mergedPdf)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, "merged.pdf")
        })
    })
  }

  const handleReset = () => {
    setFiles([])
    setMergedPdf("")
  }

  return (
    <ToolLayout
      title="Merge PDFs"
      description="Combine multiple PDF files into a single document."
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
            {isDragActive ? "Drop PDF files here..." : "Drag & drop PDF files here"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">or click to select files</p>
        </div>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">
              Selected Files ({files.length})
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-primary" />
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
          <Button onClick={handleMerge} disabled={loading || files.length < 2}>
            {loading ? "Merging..." : "Merge PDFs"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {mergedPdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium mb-4">
                ✓ PDFs merged successfully!
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Merged PDF
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

