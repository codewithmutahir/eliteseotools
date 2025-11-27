"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function ImageConvertPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [converted, setConverted] = useState<string>("")
  const [format, setFormat] = useState<string>("png")
  const [loading, setLoading] = useState(false)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64 = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64)
    setConverted("")
  }

  const handleConvert = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("format", format)

      const response = await fetch("/api/images/convert", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Conversion failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setConverted(url)
    } catch (error) {
      alert("Failed to convert image")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!converted) return
    requireAuth(() => {
      const originalName = file?.name.split(".")[0] || "image"
      fetch(converted)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `${originalName}.${format}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setConverted("")
  }

  return (
    <ToolLayout
      title="Image Format Converter"
      description="Convert images between JPEG, PNG, and WebP formats."
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
              <label className="text-sm font-medium">Convert to:</label>
              <div className="grid grid-cols-3 gap-2">
                {["jpeg", "png", "webp"].map((fmt) => (
                  <Button
                    key={fmt}
                    variant={format === fmt ? "default" : "outline"}
                    onClick={() => setFormat(fmt)}
                  >
                    {fmt.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={loading}>
                {loading ? "Converting..." : "Convert Image"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {preview && <ImagePreview src={preview} alt="Original" title="Original Image" />}
          {converted && (
            <div className="space-y-2">
              <ImagePreview
                src={converted}
                alt="Converted"
                title={`Converted to ${format.toUpperCase()}`}
              />
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download {format.toUpperCase()}
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

