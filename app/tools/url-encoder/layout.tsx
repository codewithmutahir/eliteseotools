import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free URL Encoder / Decoder Online | Elitesolution USA",
  description: "Use our free URL Encoder / Decoder tool to encode or decode URLs quickly and accurately for seamless web development.",
  keywords: "URL Encoder / Decoder",
  openGraph: {
    title: "Best Free URL Encoder / Decoder Online | Elitesolution USA",
    description: "Use our free URL Encoder / Decoder tool to encode or decode URLs quickly and accurately for seamless web development.",
    url: "https://seotools.elitesolutionusa.com/tools/url-encoder",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free URL Encoder / Decoder Online | Elitesolution USA",
    description: "Use our free URL Encoder / Decoder tool to encode or decode URLs quickly and accurately for seamless web development.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
