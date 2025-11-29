import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Duplicate Lines | Elitesolution USA",
  description: "Easily Remove Duplicate Lines from your text with our free online tool. Clean, quick, and accurate duplicate line removal.",
  keywords: "Remove Duplicate Lines",
  openGraph: {
    title: "Remove Duplicate Lines | Elitesolution USA",
    description: "Easily Remove Duplicate Lines from your text with our free online tool. Clean, quick, and accurate duplicate line removal.",
    url: "https://seotools.elitesolutionusa.com/tools/duplicate-lines",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Duplicate Lines | Elitesolution USA",
    description: "Easily Remove Duplicate Lines from your text with our free online tool. Clean, quick, and accurate duplicate line removal.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function DuplicateLinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

