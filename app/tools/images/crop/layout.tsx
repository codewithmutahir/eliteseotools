import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Crop Tool Online | Elitesolution USA",
  description: "Use our Image Crop Tool to quickly resize and crop images online for perfect dimensions. Easy, fast, and free!",
  keywords: "Image Crop Tool",
}

export default function ImageCropLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

