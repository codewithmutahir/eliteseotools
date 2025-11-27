"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { FileUpload } from "@/components/FileUpload"
import { ImagePreview } from "@/components/ImagePreview"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { imageUtils } from "@/lib/imageUtils"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function ImageMetadataPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    const base64 = await imageUtils.fileToBase64(selectedFile)
    setPreview(base64)
    setMetadata(null)
    extractMetadata(selectedFile)
  }

  const extractMetadata = async (selectedFile: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/images/metadata", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to extract metadata")

      const data = await response.json()
      setMetadata(data)
    } catch (error) {
      alert("Failed to extract metadata")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview("")
    setMetadata(null)
  }

  return (
    <ToolLayout
      title="Image Metadata Viewer"
      description="Extract and view EXIF and technical metadata from your images."
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
          <div className="grid md:grid-cols-2 gap-6">
            <ImagePreview src={preview} alt="Image" title="Image Preview" />

            {loading ? (
              <Card className="p-6 flex items-center justify-center">
                <p className="text-muted-foreground">Extracting metadata...</p>
              </Card>
            ) : metadata ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Image Metadata</h3>
                  <div className="space-y-3 text-sm">
                    <MetadataRow label="Format" value={metadata.format?.toUpperCase()} />
                    <MetadataRow label="Dimensions" value={`${metadata.width} × ${metadata.height} px`} />
                    <MetadataRow label="Size" value={imageUtils.formatFileSize(metadata.size)} />
                    <MetadataRow label="Color Space" value={metadata.space} />
                    <MetadataRow label="Channels" value={metadata.channels} />
                    <MetadataRow label="Bit Depth" value={metadata.depth} />
                    <MetadataRow label="Has Alpha" value={metadata.hasAlpha ? "Yes" : "No"} />
                    {metadata.density && (
                      <MetadataRow label="Density" value={`${metadata.density} DPI`} />
                    )}
                    {metadata.orientation && (
                      <MetadataRow label="Orientation" value={metadata.orientation} />
                    )}
                  </div>
                </Card>
              </motion.div>
            ) : null}
          </div>
        )}

        {preview && (
          <Button variant="outline" onClick={handleReset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
    </ToolLayout>
  )
}

function MetadataRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value || "N/A"}</span>
    </div>
  )
}

