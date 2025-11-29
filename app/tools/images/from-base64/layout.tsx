import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Base64 to Image Online | Elitesolution USA",
  description: "Convert Base64 to Image instantly with our free online tool. Fast, easy, and accurate Base64 to Image conversion in seconds.",
  keywords: "Base64 to Image",
  openGraph: {
    title: "Free Base64 to Image Online | Elitesolution USA",
    description: "Convert Base64 to Image instantly with our free online tool. Fast, easy, and accurate Base64 to Image conversion in seconds.",
    url: "https://seotools.elitesolutionusa.com/tools/images/from-base64",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 to Image Online | Elitesolution USA",
    description: "Convert Base64 to Image instantly with our free online tool. Fast, easy, and accurate Base64 to Image conversion in seconds.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function Base64ToImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
