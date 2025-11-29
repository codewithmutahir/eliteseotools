import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Article Rewriter Tool | Elitesolution USA",
  description: "Boost content efficiency with our Article Rewriter Tool – easily rewrite articles for unique and plagiarism-free results.",
  keywords: "Article Rewriter Tool",
}

export default function ArticleRewriterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

