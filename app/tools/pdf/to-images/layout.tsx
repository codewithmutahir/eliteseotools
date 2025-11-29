import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online PDF to Images Converter | Elitesolution USA",
  description: "Convert your documents easily with our PDF to Images tool. Fast, accurate, and free online PDF to Images converter.",
  keywords: "PDF to Images Converter",
}

export default function PDFToImagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

