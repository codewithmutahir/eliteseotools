import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Split PDF Online For Free | Elitesolution USA",
  description: "Easily Split PDF files online with our free, fast, and secure tool. Split PDF pages effortlessly in just a few clicks.",
  keywords: "Split PDF",
  openGraph: {
    title: "Split PDF Online For Free | Elitesolution USA",
    description: "Easily Split PDF files online with our free, fast, and secure tool. Split PDF pages effortlessly in just a few clicks.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/split",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online For Free | Elitesolution USA",
    description: "Easily Split PDF files online with our free, fast, and secure tool. Split PDF pages effortlessly in just a few clicks.",
  },
}

export default function PDFSplitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
