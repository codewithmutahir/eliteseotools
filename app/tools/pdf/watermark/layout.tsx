import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Watermark to PDF Online For Free | Elitesolution USA",
  description: "Easily Add Watermark to PDF online with our free tool. Protect your documents quickly and securely in just a few clicks.",
  keywords: "Add Watermark to PDF",
}

export default function PDFWatermarkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

