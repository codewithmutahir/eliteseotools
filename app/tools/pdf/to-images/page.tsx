"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"
import { Input } from "@/components/ui/input"
import { convertPdfPageToImage } from "@/lib/pdfToImageClient"

export default function PDFToImagesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState<number>(0)
  const [selectedPages, setSelectedPages] = useState<number[]>([])
  const [converting, setConverting] = useState(false)
  const [imageFormat, setImageFormat] = useState<"png" | "jpg">("png")
  const [scale, setScale] = useState<string>("2.0")
  const [useClientSide, setUseClientSide] = useState(false)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    setPageCount(0)
    setSelectedPages([])
    
    // Get page count
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/pdf/to-images", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to load PDF")
      }

      const data = await response.json()
      setPageCount(data.pageCount)
      // Prefer server-side if available, otherwise use client-side
      // If serverSideAvailable is false, it means canvas isn't installed, so use client-side
      setUseClientSide(!data.serverSideAvailable)
      // Select all pages by default
      setSelectedPages(Array.from({ length: data.pageCount }, (_, i) => i + 1))
      
      // Show message if server-side isn't available
      if (!data.serverSideAvailable) {
        console.info('Server-side conversion not available. Using client-side conversion.');
      }
    } catch (error: any) {
      console.error('PDF load error:', error)
      alert(error.message || "Failed to load PDF. Please check if the file is a valid PDF.")
    } finally {
      setLoading(false)
    }
  }

  const togglePage = (page: number) => {
    setSelectedPages(prev =>
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    )
  }

  const selectAll = () => {
    setSelectedPages(Array.from({ length: pageCount }, (_, i) => i + 1))
  }

  const deselectAll = () => {
    setSelectedPages([])
  }

  const handleConvert = async () => {
    if (!file || selectedPages.length === 0) {
      alert("Please select at least one page")
      return
    }

    // Require auth before starting conversion
    requireAuth(async () => {
      setConverting(true)
      
      try {
        // Convert selected pages to images
        for (const pageNum of selectedPages.sort((a, b) => a - b)) {
          let blob: Blob;
          
          if (useClientSide) {
            // Use client-side conversion
            try {
              blob = await convertPdfPageToImage(file, pageNum, imageFormat, parseFloat(scale))
            } catch (clientError: any) {
              console.error('Client-side conversion error:', clientError)
              throw new Error(`Failed to convert page ${pageNum}: ${clientError.message || 'Unknown error'}`)
            }
          } else {
            // Use server-side conversion
            const formData = new FormData()
            formData.append("file", file)
            formData.append("page", pageNum.toString())
            formData.append("format", imageFormat)
            formData.append("scale", scale)

            const response = await fetch("/api/pdf/to-images", {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}))
              // If server-side fails, try client-side conversion
              if (errorData.useClientSide || errorData.requiresCanvas || !useClientSide) {
                setUseClientSide(true)
                try {
                  blob = await convertPdfPageToImage(file, pageNum, imageFormat, parseFloat(scale))
                } catch (clientError: any) {
                  console.error('Client-side fallback error:', clientError)
                  throw new Error(`Failed to convert page ${pageNum}: ${clientError.message || 'Conversion failed'}`)
                }
              } else {
                throw new Error(`Unable to convert page ${pageNum}. Please try again.`)
              }
            } else {
              const contentType = response.headers.get('content-type')
              // Check if response is JSON (error flag) or blob (success)
              if (contentType?.includes('application/json')) {
                const data = await response.json()
                if (data.useClientSide || data.requiresCanvas) {
                  setUseClientSide(true)
                  try {
                    blob = await convertPdfPageToImage(file, pageNum, imageFormat, parseFloat(scale))
                  } catch (clientError: any) {
                    console.error('Client-side conversion error:', clientError)
                    throw new Error(`Failed to convert page ${pageNum}: ${clientError.message || 'Conversion failed'}`)
                  }
                } else {
                  throw new Error(`Unable to convert page ${pageNum}. Please try again.`)
                }
              } else {
                blob = await response.blob()
              }
            }
          }
          
          // Download the image
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          const extension = imageFormat === "jpg" ? "jpg" : "png"
          a.download = `${file.name.replace('.pdf', '')}_page_${pageNum}.${extension}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      } catch (error: any) {
        // Show user-friendly error message with more details
        console.error('PDF conversion error:', error);
        let errorMessage = "Unable to convert pages. Please try again or check your PDF file.";
        
        if (error.message) {
          // Use specific error message if available
          if (error.message.includes('Page') && error.message.includes('out of range')) {
            errorMessage = error.message;
          } else if (error.message.includes('canvas')) {
            errorMessage = "Your browser doesn't support image conversion. Please try a different browser.";
          } else if (error.message.includes('PDF')) {
            errorMessage = error.message;
          } else {
            errorMessage = `Conversion failed: ${error.message}`;
          }
        }
        
        alert(errorMessage)
      } finally {
        setConverting(false)
      }
    })
  }

  const handleReset = () => {
    setFile(null)
    setPageCount(0)
    setSelectedPages([])
  }

  return (
    <ToolLayout
      title="PDF to Images"
      description="Convert PDF pages to PNG or JPG image files. Select pages and download as images."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "application/pdf": [".pdf"] }}
          maxSize={20 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {loading && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">Loading PDF...</p>
          </Card>
        )}

        {pageCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">Select Pages to Extract</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPages.length} of {pageCount} pages selected
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => togglePage(page)}
                    className={`p-2 rounded border text-sm font-medium transition-colors ${
                      selectedPages.includes(page)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted hover:bg-muted/80 border-border"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Image Format</label>
                <div className="flex gap-2">
                  <Button
                    variant={imageFormat === "png" ? "default" : "outline"}
                    onClick={() => setImageFormat("png")}
                    className="flex-1"
                  >
                    PNG
                  </Button>
                  <Button
                    variant={imageFormat === "jpg" ? "default" : "outline"}
                    onClick={() => setImageFormat("jpg")}
                    className="flex-1"
                  >
                    JPG
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Quality/Scale: {scale}x
                </label>
                <Input
                  type="number"
                  min="1"
                  max="4"
                  step="0.5"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  placeholder="2.0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Higher values = better quality but larger file size (1.0-4.0)
                </p>
              </div>
            </Card>


            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={converting || selectedPages.length === 0}>
                {converting ? "Converting..." : `Convert ${selectedPages.length} Page(s) to ${imageFormat.toUpperCase()}`}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
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

