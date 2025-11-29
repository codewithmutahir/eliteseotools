import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Crop Tool Online | Elitesolution USA",
  description: "Use our Image Crop Tool to quickly resize and crop images online for perfect dimensions. Easy, fast, and free!",
  keywords: "Image Crop Tool",
  openGraph: {
    title: "Free Image Crop Tool Online | Elitesolution USA",
    description: "Use our Image Crop Tool to quickly resize and crop images online for perfect dimensions. Easy, fast, and free!",
    url: "https://seotools.elitesolutionusa.com/tools/images/crop",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Crop Tool Online | Elitesolution USA",
    description: "Use our Image Crop Tool to quickly resize and crop images online for perfect dimensions. Easy, fast, and free!",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function ImageCropLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
