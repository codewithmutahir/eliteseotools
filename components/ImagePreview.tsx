"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "./ui/card"

interface ImagePreviewProps {
  src: string
  alt: string
  title?: string
  fileSize?: string
  width?: number
  height?: number
}

export function ImagePreview({
  src,
  alt,
  title = "Preview",
  fileSize,
  width,
  height,
}: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{title}</label>
        {fileSize && (
          <span className="text-xs text-muted-foreground">{fileSize}</span>
        )}
      </div>
      <Card className="p-4 bg-muted/50">
        <div className="relative w-full flex items-center justify-center min-h-[200px]">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[400px] object-contain rounded"
          />
        </div>
        {width && height && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            {width} × {height} px
          </p>
        )}
      </Card>
    </motion.div>
  )
}

