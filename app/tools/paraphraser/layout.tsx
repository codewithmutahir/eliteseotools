import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Paraphrasing Tool | Elitesolution USA",
  description: "Instantly rewrite and improve text using our Free Online Paraphrasing Tool for an fluent, and plagiarism-free content.",
  keywords: "Free Online Paraphrasing Tool",
}

export default function ParaphraserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

