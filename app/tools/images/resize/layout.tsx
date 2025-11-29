import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Resizer Online | Elitesolution USA",
  description: "Quickly resize your photos online with our free Image Resizer. Easy, fast, and precise image resizing for all your needs.",
  keywords: "Image Resizer",
}

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

