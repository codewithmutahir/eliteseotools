"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/cn"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: Record<string, string[]>
  maxSize?: number
  currentFile?: File | null
  onRemove?: () => void
  multiple?: boolean
  onMultipleFilesSelect?: (files: File[]) => void
}

export function FileUpload({
  onFileSelect,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  currentFile,
  onRemove,
  multiple = false,
  onMultipleFilesSelect,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        if (multiple && onMultipleFilesSelect) {
          onMultipleFilesSelect(acceptedFiles)
        } else {
          onFileSelect(acceptedFiles[0])
        }
      }
    },
    [onFileSelect, multiple, onMultipleFilesSelect]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary/50",
          currentFile && "border-green-500 bg-green-500/10"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg font-medium">Drop the file here...</p>
          ) : (
            <>
              <p className="text-lg font-medium">
                Drag & drop {multiple ? "files" : "a file"} here, or click to select
              </p>
              <p className="text-sm text-muted-foreground">
                Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
              </p>
            </>
          )}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-destructive/10 text-destructive rounded-md"
        >
          <p className="font-medium">File rejected:</p>
          <ul className="list-disc list-inside text-sm mt-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {errors[0].message}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {currentFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-muted rounded-md"
        >
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">{currentFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(currentFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1 hover:bg-destructive/10 rounded transition-colors"
            >
              <X className="h-4 w-4 text-destructive" />
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

