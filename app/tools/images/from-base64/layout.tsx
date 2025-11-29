import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Base64 to Image Online | Elitesolution USA",
  description: "Convert Base64 to Image instantly with our free online tool. Fast, easy, and accurate Base64 to Image conversion in seconds.",
  keywords: "Base64 to Image",
}

export default function Base64ToImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

