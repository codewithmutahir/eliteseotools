import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Extract Text from PDF Online For Free | Elitesolution USA",
  description: "Easily Extract Text from PDF online for free. Convert PDF content into editable text quickly and accurately with our tool.",
  keywords: "Extract Text from PDF",
}

export default function PDFExtractTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

