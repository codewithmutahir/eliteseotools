"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  FileText,
  CheckCircle,
  FileSearch,
  RefreshCw,
  Maximize,
  Shield,
  Calculator,
  Type,
  Eraser,
  Minus,
  Copy,
  ArrowUpAZ,
  TextCursorInput,
  RotateCcw,
  Code,
  FileCode,
  Link as LinkIcon,
  Hash,
  BarChart3,
  GitCompare,
  ImageIcon,
  Minimize2,
  ScanLine,
  Binary,
  Crop,
  Info,
  FilePlus2,
  Scissors,
  FileDown,
  FileImage,
  Files,
  FileType,
  Droplet,
} from "lucide-react"

const aiTools = [
  {
    name: "Paraphrasing Tool",
    description: "Rewrite text while maintaining meaning",
    href: "/tools/paraphraser",
    icon: RefreshCw,
    color: "text-blue-500",
  },
  {
    name: "Grammar Checker",
    description: "Check grammar, spelling, and punctuation",
    href: "/tools/grammar-checker",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    name: "Text Summarizer",
    description: "Summarize long content into key points",
    href: "/tools/summarizer",
    icon: FileSearch,
    color: "text-purple-500",
  },
  {
    name: "Article Rewriter",
    description: "Completely rewrite articles with new words",
    href: "/tools/article-rewriter",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    name: "Text Expander",
    description: "Make text longer and more detailed",
    href: "/tools/text-expander",
    icon: Maximize,
    color: "text-pink-500",
  },
  {
    name: "Plagiarism Checker",
    description: "AI-based plagiarism detection",
    href: "/tools/plagiarism-checker",
    icon: Shield,
    color: "text-red-500",
  },
]

const textTools = [
  {
    name: "Word Counter",
    description: "Count words, characters, and more",
    href: "/tools/word-counter",
    icon: Calculator,
    color: "text-cyan-500",
  },
  {
    name: "Text Case Converter",
    description: "Convert text between different cases",
    href: "/tools/text-case",
    icon: Type,
    color: "text-indigo-500",
  },
  {
    name: "Remove Extra Spaces",
    description: "Clean up extra whitespace",
    href: "/tools/remove-spaces",
    icon: Eraser,
    color: "text-teal-500",
  },
  {
    name: "Remove Line Breaks",
    description: "Convert to single line",
    href: "/tools/remove-line-breaks",
    icon: Minus,
    color: "text-amber-500",
  },
  {
    name: "Remove Duplicate Lines",
    description: "Keep only unique lines",
    href: "/tools/duplicate-lines",
    icon: Copy,
    color: "text-lime-500",
  },
  {
    name: "Sort Lines",
    description: "Sort lines alphabetically",
    href: "/tools/sort-lines",
    icon: ArrowUpAZ,
    color: "text-emerald-500",
  },
  {
    name: "Find & Replace",
    description: "Search and replace text",
    href: "/tools/find-replace",
    icon: TextCursorInput,
    color: "text-violet-500",
  },
  {
    name: "Reverse Text",
    description: "Reverse character order",
    href: "/tools/reverse-text",
    icon: RotateCcw,
    color: "text-fuchsia-500",
  },
  {
    name: "JSON Formatter",
    description: "Format and beautify JSON",
    href: "/tools/json-formatter",
    icon: Code,
    color: "text-rose-500",
  },
  {
    name: "HTML Cleaner",
    description: "Strip HTML tags from text",
    href: "/tools/html-cleaner",
    icon: FileCode,
    color: "text-sky-500",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs",
    href: "/tools/url-encoder",
    icon: LinkIcon,
    color: "text-blue-600",
  },
  {
    name: "Base64 Encode/Decode",
    description: "Encode or decode Base64",
    href: "/tools/base64",
    icon: Hash,
    color: "text-green-600",
  },
  {
    name: "Word Density Analyzer",
    description: "Analyze keyword frequency",
    href: "/tools/word-density",
    icon: BarChart3,
    color: "text-purple-600",
  },
  {
    name: "Text Compare",
    description: "Compare two texts side-by-side",
    href: "/tools/text-compare",
    icon: GitCompare,
    color: "text-orange-600",
  },
]

const imageTools = [
  {
    name: "Image Compressor",
    description: "Reduce file size with quality control",
    href: "/tools/images/compress",
    icon: Minimize2,
    color: "text-pink-500",
  },
  {
    name: "Image Resizer",
    description: "Resize images by width/height",
    href: "/tools/images/resize",
    icon: Maximize,
    color: "text-blue-500",
  },
  {
    name: "Format Converter",
    description: "Convert JPG, PNG, WebP formats",
    href: "/tools/images/convert",
    icon: ScanLine,
    color: "text-green-500",
  },
  {
    name: "Image to Base64",
    description: "Convert image to Base64 string",
    href: "/tools/images/to-base64",
    icon: Binary,
    color: "text-purple-500",
  },
  {
    name: "Base64 to Image",
    description: "Decode Base64 to image",
    href: "/tools/images/from-base64",
    icon: ImageIcon,
    color: "text-orange-500",
  },
  {
    name: "Image Crop Tool",
    description: "Crop images with coordinates",
    href: "/tools/images/crop",
    icon: Crop,
    color: "text-red-500",
  },
  {
    name: "Metadata Viewer",
    description: "View EXIF and image metadata",
    href: "/tools/images/metadata",
    icon: Info,
    color: "text-teal-500",
  },
]

const pdfTools = [
  {
    name: "Merge PDFs",
    description: "Combine multiple PDFs into one",
    href: "/tools/pdf/merge",
    icon: FilePlus2,
    color: "text-blue-600",
  },
  {
    name: "Split PDF",
    description: "Extract pages from PDF",
    href: "/tools/pdf/split",
    icon: Scissors,
    color: "text-green-600",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size",
    href: "/tools/pdf/compress",
    icon: FileDown,
    color: "text-purple-600",
  },
  {
    name: "PDF to Images",
    description: "Convert pages to images",
    href: "/tools/pdf/to-images",
    icon: FileImage,
    color: "text-orange-600",
  },
  {
    name: "Images to PDF",
    description: "Create PDF from images",
    href: "/tools/pdf/images-to-pdf",
    icon: Files,
    color: "text-pink-600",
  },
  {
    name: "Extract Text",
    description: "Extract text from PDF",
    href: "/tools/pdf/extract-text",
    icon: FileType,
    color: "text-cyan-600",
  },
  {
    name: "Add Watermark",
    description: "Add text watermark to PDF",
    href: "/tools/pdf/watermark",
    icon: Droplet,
    color: "text-indigo-600",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Elite SEO Suite
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of AI-powered and text processing tools for content creation, SEO, and text manipulation.
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* AI-Powered Tools */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            🤖 AI-Powered Tools
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aiTools.map((tool) => (
              <motion.div key={tool.href} variants={item}>
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <tool.icon className={`h-8 w-8 ${tool.color}`} />
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Text Processing Tools */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            ✏️ Text Processing Tools
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {textTools.map((tool) => (
              <motion.div key={tool.href} variants={item}>
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Image Tools */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            🖼️ Image Tools
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {imageTools.map((tool) => (
              <motion.div key={tool.href} variants={item}>
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PDF Tools */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            📄 PDF Tools
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {pdfTools.map((tool) => (
              <motion.div key={tool.href} variants={item}>
                <Link href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  )
}

