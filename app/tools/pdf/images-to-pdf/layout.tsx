import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Images to PDF Converter | Elitesolution USA",
  description: "Convert your pictures effortlessly with our Images to PDF Converter. Fast, free, and easy-to-use tool for all image formats.",
  keywords: "Images to PDF Converter",
  openGraph: {
    title: "Free Online Images to PDF Converter | Elitesolution USA",
    description: "Convert your pictures effortlessly with our Images to PDF Converter. Fast, free, and easy-to-use tool for all image formats.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/images-to-pdf",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Images to PDF Converter | Elitesolution USA",
    description: "Convert your pictures effortlessly with our Images to PDF Converter. Fast, free, and easy-to-use tool for all image formats.",
  },
}

export default function ImagesToPDFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

