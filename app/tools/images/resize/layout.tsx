import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Resizer Online | Elitesolution USA",
  description: "Quickly resize your photos online with our free Image Resizer. Easy, fast, and precise image resizing for all your needs.",
  keywords: "Image Resizer",
  openGraph: {
    title: "Free Image Resizer Online | Elitesolution USA",
    description: "Quickly resize your photos online with our free Image Resizer. Easy, fast, and precise image resizing for all your needs.",
    url: "https://seotools.elitesolutionusa.com/tools/images/resize",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Resizer Online | Elitesolution USA",
    description: "Quickly resize your photos online with our free Image Resizer. Easy, fast, and precise image resizing for all your needs.",
  },
}

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
