import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Article Rewriter Tool | Elitesolution USA",
  description: "Boost content efficiency with our Article Rewriter Tool – easily rewrite articles for unique and plagiarism-free results.",
  keywords: "Article Rewriter Tool",
  openGraph: {
    title: "Free Online Article Rewriter Tool | Elitesolution USA",
    description: "Boost content efficiency with our Article Rewriter Tool – easily rewrite articles for unique and plagiarism-free results.",
    url: "https://seotools.elitesolutionusa.com/tools/article-rewriter",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Article Rewriter Tool | Elitesolution USA",
    description: "Boost content efficiency with our Article Rewriter Tool – easily rewrite articles for unique and plagiarism-free results.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function ArticleRewriterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

