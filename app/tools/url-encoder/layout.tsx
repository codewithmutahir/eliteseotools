import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free URL Encoder / Decoder Online | Elitesolution USA",
  description: "Use our free URL Encoder / Decoder tool to encode or decode URLs quickly and accurately for seamless web development.",
  keywords: "URL Encoder / Decoder",
}

export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

