import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Metadata Viewer Online | Elitesolution USA",
  description: "Use our Image Metadata Viewer to quickly inspect and analyze metadata of any image for SEO and digital insights.",
  keywords: "Image Metadata Viewer",
  openGraph: {
    title: "Free Image Metadata Viewer Online | Elitesolution USA",
    description: "Use our Image Metadata Viewer to quickly inspect and analyze metadata of any image for SEO and digital insights.",
    url: "https://seotools.elitesolutionusa.com/tools/images/metadata",
    siteName: "Elitesolution USA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Metadata Viewer Online | Elitesolution USA",
    description: "Use our Image Metadata Viewer to quickly inspect and analyze metadata of any image for SEO and digital insights.",
  },
}

export default function ImageMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
