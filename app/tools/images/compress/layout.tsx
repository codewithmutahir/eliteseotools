import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Compressor Online | Elitesolution USA",
  description: "Optimize your visuals fast with our Image Compressor – reduce file size without losing quality for web and social media use.",
  keywords: "Image Compressor",
}

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

