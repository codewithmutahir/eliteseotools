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

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageRanges, setPageRanges] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [splitPdf, setSplitPdf] = useState<string>("")
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setSplitPdf("")
  }

  const handleSplit = async () => {
    if (!file || !pageRanges) {
      alert("Please upload a PDF and specify page ranges")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("pageRanges", pageRanges)

      const response = await fetch("/api/pdf/split", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Split failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setSplitPdf(url)
    } catch (error) {
      alert("Failed to split PDF. Check your page ranges.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!splitPdf) return
    requireAuth(() => {
      fetch(splitPdf)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, "split.pdf")
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setPageRanges("")
    setSplitPdf("")
  }

  return (
    <ToolLayout
      title="Split PDF"
      description="Extract specific pages from a PDF document by specifying page ranges."
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
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Page Ranges (e.g., 1-3,5,7-9)
              </label>
              <Input
                placeholder="1-3,5,7-9"
                value={pageRanges}
                onChange={(e) => setPageRanges(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use commas to separate ranges and dashes for consecutive pages
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSplit} disabled={loading || !pageRanges}>
                {loading ? "Splitting..." : "Split PDF"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </>
        )}

        {splitPdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium mb-4">
                ✓ PDF split successfully!
              </p>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Split PDF
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

