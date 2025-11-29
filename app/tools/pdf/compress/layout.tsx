import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compress PDF Online For Free | Elitesolution USA",
  description: "Easily Compress PDF files online for faster sharing and storage. Quick, secure, and free PDF compression with just a few clicks.",
  keywords: "Compress PDF",
  openGraph: {
    title: "Compress PDF Online For Free | Elitesolution USA",
    description: "Easily Compress PDF files online for faster sharing and storage. Quick, secure, and free PDF compression with just a few clicks.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/compress",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online For Free | Elitesolution USA",
    description: "Easily Compress PDF files online for faster sharing and storage. Quick, secure, and free PDF compression with just a few clicks.",
  },
}

export default function PDFCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
