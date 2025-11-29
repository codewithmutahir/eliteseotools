import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online PDF to Images Converter | Elitesolution USA",
  description: "Convert your documents easily with our PDF to Images tool. Fast, accurate, and free online PDF to Images converter.",
  keywords: "PDF to Images Converter",
  openGraph: {
    title: "Free Online PDF to Images Converter | Elitesolution USA",
    description: "Convert your documents easily with our PDF to Images tool. Fast, accurate, and free online PDF to Images converter.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/to-images",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online PDF to Images Converter | Elitesolution USA",
    description: "Convert your documents easily with our PDF to Images tool. Fast, accurate, and free online PDF to Images converter.",
  },
}

export default function PDFToImagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
