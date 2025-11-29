import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Word Density Analyzer | Elitesolution USA",
  description: "Use our Word Density Analyzer to check and optimize keyword frequency for better SEO performance on your website.",
  keywords: "Word Density Analyzer",
  openGraph: {
    title: "Free Online Word Density Analyzer | Elitesolution USA",
    description: "Use our Word Density Analyzer to check and optimize keyword frequency for better SEO performance on your website.",
    url: "https://seotools.elitesolutionusa.com/tools/word-density",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Word Density Analyzer | Elitesolution USA",
    description: "Use our Word Density Analyzer to check and optimize keyword frequency for better SEO performance on your website.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function WordDensityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
