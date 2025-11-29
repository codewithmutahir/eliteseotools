import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Split PDF Online For Free | Elitesolution USA",
  description: "Easily Split PDF files online with our free, fast, and secure tool. Split PDF pages effortlessly in just a few clicks.",
  keywords: "Split PDF",
}

export default function PDFSplitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

