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

export default function ImageCropPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [cropped, setCropped] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [dimensions, setDimensions] = useState<any>(null)
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()
  const [cropParams, setCropParams] = useState({
    left: "0",
    top: "0",
    width: "",
    height: "",
  })

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64 = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64)
    const dims = await imageUtils.getImageDimensions(selectedFile)
    setDimensions(dims)
    setCropped("")
    setCropParams({
      left: "0",
      top: "0",
      width: dims.width.toString(),
      height: dims.height.toString(),
    })
  }

  const handleCrop = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("left", cropParams.left)
      formData.append("top", cropParams.top)
      formData.append("width", cropParams.width)
      formData.append("height", cropParams.height)

      const response = await fetch("/api/images/crop", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Crop failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setCropped(url)
    } catch (error) {
      alert("Failed to crop image. Check your crop parameters.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!cropped) return
    requireAuth(() => {
      fetch(cropped)
        .then((res) => res.blob())
        .then((blob) => {
          imageUtils.downloadFile(blob, `cropped-${file?.name}`)
        })
    })
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setCropped("")
    setDimensions(null)
  }

  return (
    <ToolLayout
      title="Image Crop Tool"
      description="Crop images by specifying coordinates and dimensions."
    >
      <div className="space-y-6">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          maxSize={10 * 1024 * 1024}
          currentFile={file}
          onRemove={handleReset}
        />

        {preview && dimensions && (
          <>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                Image dimensions: {dimensions.width} × {dimensions.height} px
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Left (X)</label>
                <Input
                  type="number"
                  value={cropParams.left}
                  onChange={(e) => setCropParams({ ...cropParams, left: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Top (Y)</label>
                <Input
                  type="number"
                  value={cropParams.top}
                  onChange={(e) => setCropParams({ ...cropParams, top: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Width</label>
                <Input
                  type="number"
                  value={cropParams.width}
                  onChange={(e) => setCropParams({ ...cropParams, width: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height</label>
                <Input
                  type="number"
                  value={cropParams.height}
                  onChange={(e) => setCropParams({ ...cropParams, height: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCrop} disabled={loading}>
                {loading ? "Cropping..." : "Crop Image"}
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
          {cropped && (
            <div className="space-y-2">
              <ImagePreview src={cropped} alt="Cropped" title="Cropped Image" />
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Cropped Image
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

