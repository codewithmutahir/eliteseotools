import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Merge PDFs Online For Free | Elitesolution USA",
  description: "Merge PDFs quickly and easily with our free online tool. Combine multiple PDF files into one in just a few clicks.",
  keywords: "Merge PDFs",
}

export default function PDFMergeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

