import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image to Base64 Online | Elitesolution USA",
  description: "Convert images instantly with our Image to Base64 tool. Easy, fast, and free online conversion for all image formats.",
  keywords: "Image to Base64",
  openGraph: {
    title: "Free Image to Base64 Online | Elitesolution USA",
    description: "Convert images instantly with our Image to Base64 tool. Easy, fast, and free online conversion for all image formats.",
    url: "https://seotools.elitesolutionusa.com/tools/images/to-base64",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Base64 Online | Elitesolution USA",
    description: "Convert images instantly with our Image to Base64 tool. Easy, fast, and free online conversion for all image formats.",
  },
}

export default function ImageToBase64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
