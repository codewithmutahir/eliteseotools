import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Watermark to PDF Online For Free | Elitesolution USA",
  description: "Easily Add Watermark to PDF online with our free tool. Protect your documents quickly and securely in just a few clicks.",
  keywords: "Add Watermark to PDF",
  openGraph: {
    title: "Add Watermark to PDF Online For Free | Elitesolution USA",
    description: "Easily Add Watermark to PDF online with our free tool. Protect your documents quickly and securely in just a few clicks.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/watermark",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Watermark to PDF Online For Free | Elitesolution USA",
    description: "Easily Add Watermark to PDF online with our free tool. Protect your documents quickly and securely in just a few clicks.",
  },
}

export default function PDFWatermarkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
