import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Base64 Encode / Decode Tool Online | Elitesolution USA",
  description: "Quickly convert text and files to/from Base64 using our Free online Base64 Encode/Decode tool. Secure, and instant.",
  keywords: "Base64 Encode / Decode",
}

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

