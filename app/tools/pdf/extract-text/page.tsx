"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, RefreshCw, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function PDFExtractTextPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setExtractedData(null)
  }

  const handleExtract = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/pdf/extract-text", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Extraction failed")

      const data = await response.json()
      setExtractedData(data)
    } catch (error) {
      alert("Failed to extract text from PDF")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyText = () => {
    if (!extractedData?.text) return
    requireAuth(() => {
      navigator.clipboard.writeText(extractedData.text)
      alert("Text copied to clipboard!")
    })
  }

  const handleDownloadText = () => {
    if (!extractedData?.text) return
    requireAuth(() => {
      const blob = new Blob([extractedData.text], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${file?.name.replace('.pdf', '')}_extracted.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  const handleReset = () => {
    setFile(null)
    setExtractedData(null)
  }

  return (
    <ToolLayout
      title="Extract Text from PDF"
      description="Extract all text content from PDF documents with full text parsing support."
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
          <div className="flex gap-2">
            <Button onClick={handleExtract} disabled={loading}>
              {loading ? "Extracting..." : "Extract Text"}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        )}

        {extractedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {extractedData.success ? (
              <>
                <Card className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{extractedData.pageCount}</div>
                      <div className="text-xs text-muted-foreground">Pages</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{extractedData.wordCount?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Words</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{extractedData.characterCount?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Characters</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">✓</div>
                      <div className="text-xs text-muted-foreground">Extracted</div>
                    </div>
                  </div>
                </Card>

                {extractedData.info && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Document Info</h3>
                    <div className="text-sm space-y-1">
                      {extractedData.info.Title && (
                        <p><span className="text-muted-foreground">Title:</span> {extractedData.info.Title}</p>
                      )}
                      {extractedData.info.Author && (
                        <p><span className="text-muted-foreground">Author:</span> {extractedData.info.Author}</p>
                      )}
                      {extractedData.info.Creator && (
                        <p><span className="text-muted-foreground">Creator:</span> {extractedData.info.Creator}</p>
                      )}
                    </div>
                  </Card>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Extracted Text</label>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCopyText}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleDownloadText}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={extractedData.text}
                    readOnly
                    rows={20}
                    className="resize-none bg-muted"
                  />
                </div>
              </>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  {extractedData.message || "Could not extract text from this PDF"}
                </p>
                {extractedData.note && (
                  <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">
                    {extractedData.note}
                  </p>
                )}
                {extractedData.pageCount && (
                  <div className="mt-4 text-sm">
                    <p><span className="text-muted-foreground">Pages:</span> {extractedData.pageCount}</p>
                    <p><span className="text-muted-foreground">Title:</span> {extractedData.title}</p>
                    <p><span className="text-muted-foreground">Author:</span> {extractedData.author}</p>
                  </div>
                )}
              </div>
            )}
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

