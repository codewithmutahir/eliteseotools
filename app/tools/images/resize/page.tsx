"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "@/components/AuthModal"

export default function ImageResizePage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [resized, setResized] = useState<string>("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [loading, setLoading] = useState(false)
  const [dimensions, setDimensions] = useState<any>(null)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64 = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64)
    const dims = await imageUtils.getImageDimensions(selectedFile)
    setDimensions({ original: dims })
    setResized("")
  }

  const handleResize = async () => {
    if (!file || (!width && !height)) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      if (width) formData.append("width", width)
      if (height) formData.append("height", height)
      formData.append("maintainAspectRatio", maintainAspectRatio.toString())

      const response = await fetch("/api/images/resize", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Resize failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setResized(url)

      const newWidth = response.headers.get("X-New-Width")
      const newHeight = response.headers.get("X-New-Height")
      setDimensions({
        ...dimensions,
        resized: { width: parseInt(newWidth || "0"), height: parseInt(newHeight || "0") },
      })
    } catch (error) {
      alert("Failed to resize image")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!resized) return
    requireAuth(() => {
      fetch(resized)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `resized-${file?.name}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setResized("")
    setWidth("")
    setHeight("")
    setDimensions(null)
  }

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images by width and/or height with option to maintain aspect ratio."
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
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Width (px)</label>
                <Input
                  type="number"
                  placeholder="Enter width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height (px)</label>
                <Input
                  type="number"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="aspectRatio" className="text-sm">
                Maintain aspect ratio
              </label>
            </div>

            {dimensions?.original && (
              <p className="text-sm text-muted-foreground">
                Original: {dimensions.original.width} × {dimensions.original.height} px
              </p>
            )}

            <div className="flex gap-2">
              <Button onClick={handleResize} disabled={loading || (!width && !height)}>
                {loading ? "Resizing..." : "Resize Image"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {preview && (
            <ImagePreview
              src={preview}
              alt="Original"
              title="Original Image"
              width={dimensions?.original?.width}
              height={dimensions?.original?.height}
            />
          )}
          {resized && (
            <div className="space-y-2">
              <ImagePreview
                src={resized}
                alt="Resized"
                title="Resized Image"
                width={dimensions?.resized?.width}
                height={dimensions?.resized?.height}
              />
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resized Image
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

