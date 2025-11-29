import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Long Text Summarizer | Elitesolution USA",
  description: "Use our Text Summarizer to quickly condense articles, documents, and content into clear, concise summaries online.",
  keywords: "Text Summarizer",
}

export default function SummarizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

