import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Word Density Analyzer | Elitesolution USA",
  description: "Use our Word Density Analyzer to check and optimize keyword frequency for better SEO performance on your website.",
  keywords: "Word Density Analyzer",
}

export default function WordDensityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

