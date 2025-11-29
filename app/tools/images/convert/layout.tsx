import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Format Converter Online | Elitesolution USA",
  description: "Convert your images quickly and easily with our Image Format Converter. Support multiple formats for fast, hassle-free image conversion.",
  keywords: "Image Format Converter",
}

export default function ImageConvertLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

