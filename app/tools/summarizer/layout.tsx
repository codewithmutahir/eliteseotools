import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Long Text Summarizer | Elitesolution USA",
  description: "Use our Text Summarizer to quickly condense articles, documents, and content into clear, concise summaries online.",
  keywords: "Text Summarizer",
  openGraph: {
    title: "Free Online Long Text Summarizer | Elitesolution USA",
    description: "Use our Text Summarizer to quickly condense articles, documents, and content into clear, concise summaries online.",
    url: "https://seotools.elitesolutionusa.com/tools/summarizer",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Long Text Summarizer | Elitesolution USA",
    description: "Use our Text Summarizer to quickly condense articles, documents, and content into clear, concise summaries online.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function SummarizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

