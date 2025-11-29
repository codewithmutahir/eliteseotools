import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Find and Replace Tool | Elitesolution USA",
  description: "Use our Find and Replace Tool to quickly search and update text across your files with ease and accuracy.",
  keywords: "Find and Replace Tool",
  openGraph: {
    title: "Free Online Find and Replace Tool | Elitesolution USA",
    description: "Use our Find and Replace Tool to quickly search and update text across your files with ease and accuracy.",
    url: "https://seotools.elitesolutionusa.com/tools/find-replace",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Find and Replace Tool | Elitesolution USA",
    description: "Use our Find and Replace Tool to quickly search and update text across your files with ease and accuracy.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function FindReplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

