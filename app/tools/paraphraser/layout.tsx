import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Paraphrasing Tool | Elitesolution USA",
  description: "Instantly rewrite and improve text using our Free Online Paraphrasing Tool for an fluent, and plagiarism-free content.",
  keywords: "Free Online Paraphrasing Tool",
  openGraph: {
    title: "Free Online Paraphrasing Tool | Elitesolution USA",
    description: "Instantly rewrite and improve text using our Free Online Paraphrasing Tool for an fluent, and plagiarism-free content.",
    url: "https://seotools.elitesolutionusa.com/tools/paraphraser",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Paraphrasing Tool | Elitesolution USA",
    description: "Instantly rewrite and improve text using our Free Online Paraphrasing Tool for an fluent, and plagiarism-free content.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function ParaphraserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

