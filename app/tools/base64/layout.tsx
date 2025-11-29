import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Base64 Encode / Decode Tool Online | Elitesolution USA",
  description: "Quickly convert text and files to/from Base64 using our Free online Base64 Encode/Decode tool. Secure, and instant.",
  keywords: "Base64 Encode / Decode",
  openGraph: {
    title: "Free Base64 Encode / Decode Tool Online | Elitesolution USA",
    description: "Quickly convert text and files to/from Base64 using our Free online Base64 Encode/Decode tool. Secure, and instant.",
    url: "https://seotools.elitesolutionusa.com/tools/base64",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Base64 Encode / Decode Tool Online | Elitesolution USA",
    description: "Quickly convert text and files to/from Base64 using our Free online Base64 Encode/Decode tool. Secure, and instant.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
