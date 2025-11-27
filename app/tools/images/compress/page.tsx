"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function ImageCompressPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [compressed, setCompressed] = useState<string>("")
  const [quality, setQuality] = useState(80)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64 = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64)
    setCompressed("")
    setStats(null)
  }

  const handleCompress = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("quality", quality.toString())

      const response = await fetch("/api/images/compress", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Compression failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setCompressed(url)

      const originalSize = parseInt(response.headers.get("X-Original-Size") || "0")
      const compressedSize = parseInt(response.headers.get("X-Compressed-Size") || "0")
      const savings = response.headers.get("X-Savings")

      setStats({
        originalSize: imageUtils.formatFileSize(originalSize),
        compressedSize: imageUtils.formatFileSize(compressedSize),
        savings: savings + "%",
      })
    } catch (error) {
      alert("Failed to compress image")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!compressed) return
    
    requireAuth(() => {
      fetch(compressed)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `compressed-${file?.name}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setCompressed("")
    setStats(null)
    setQuality(80)
  }

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while maintaining quality. Supports JPEG, PNG, and WebP formats."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          maxSize={10 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {preview && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality: {quality}%</label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Lower quality = smaller file size
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCompress} disabled={loading}>
                {loading ? "Compressing..." : "Compress Image"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </>
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

        <div className="grid md:grid-cols-2 gap-4">
          {preview && <ImagePreview src={preview} alt="Original" title="Original Image" />}
          {compressed && (
            <div className="space-y-2">
              <ImagePreview src={compressed} alt="Compressed" title="Compressed Image" />
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Compressed Image
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </ToolLayout>
  )
}

