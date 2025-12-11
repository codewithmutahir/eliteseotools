import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Google Rank Checker Tool | Elitesolution USA",
  description: "Check your website's Google search ranking for any keyword. Track your SEO performance and monitor your position in search results with our free rank checker tool.",
  keywords: "Google Rank Checker, SEO Rank Checker, Keyword Ranking, Search Engine Ranking",
  openGraph: {
    title: "Free Google Rank Checker Tool | Elitesolution USA",
    description: "Check your website's Google search ranking for any keyword. Track your SEO performance and monitor your position in search results.",
    url: "https://seotools.elitesolutionusa.com/tools/google-rank-checker",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Google Rank Checker Tool | Elitesolution USA",
    description: "Check your website's Google search ranking for any keyword. Track your SEO performance and monitor your position in search results.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function GoogleRankCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

