import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Extract Text from PDF Online For Free | Elitesolution USA",
  description: "Easily Extract Text from PDF online for free. Convert PDF content into editable text quickly and accurately with our tool.",
  keywords: "Extract Text from PDF",
  openGraph: {
    title: "Extract Text from PDF Online For Free | Elitesolution USA",
    description: "Easily Extract Text from PDF online for free. Convert PDF content into editable text quickly and accurately with our tool.",
    url: "https://seotools.elitesolutionusa.com/tools/pdf/extract-text",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract Text from PDF Online For Free | Elitesolution USA",
    description: "Easily Extract Text from PDF online for free. Convert PDF content into editable text quickly and accurately with our tool.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function PDFExtractTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

