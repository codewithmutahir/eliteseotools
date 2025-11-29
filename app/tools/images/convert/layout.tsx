import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Format Converter Online | Elitesolution USA",
  description: "Convert your images quickly and easily with our Image Format Converter. Support multiple formats for fast, hassle-free image conversion.",
  keywords: "Image Format Converter",
  openGraph: {
    title: "Free Image Format Converter Online | Elitesolution USA",
    description: "Convert your images quickly and easily with our Image Format Converter. Support multiple formats for fast, hassle-free image conversion.",
    url: "https://seotools.elitesolutionusa.com/tools/images/convert",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Format Converter Online | Elitesolution USA",
    description: "Convert your images quickly and easily with our Image Format Converter. Support multiple formats for fast, hassle-free image conversion.",
  },
}

export default function ImageConvertLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
