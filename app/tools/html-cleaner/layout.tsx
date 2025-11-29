import { Metadata } from "next"

export const metadata: Metadata = {
  title: "HTML Cleaner — Clean & Format HTML | Elitesolution USA",
  description: "Use our HTML Cleaner to quickly clean, format, and optimize your HTML code for better readability and performance online.",
  keywords: "HTML Cleaner",
}

export default function HTMLCleanerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

