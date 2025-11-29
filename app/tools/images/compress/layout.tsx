import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Compressor Online | Elitesolution USA",
  description: "Optimize your visuals fast with our Image Compressor – reduce file size without losing quality for web and social media use.",
  keywords: "Image Compressor",
  openGraph: {
    title: "Free Image Compressor Online | Elitesolution USA",
    description: "Optimize your visuals fast with our Image Compressor – reduce file size without losing quality for web and social media use.",
    url: "https://seotools.elitesolutionusa.com/tools/images/compress",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor Online | Elitesolution USA",
    description: "Optimize your visuals fast with our Image Compressor – reduce file size without losing quality for web and social media use.",
  },
}

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

