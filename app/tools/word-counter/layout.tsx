import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Word Counter Online | Elitesolution USA",
  description: "Use our Word Counter tool to quickly count words, characters, and improve your writing efficiency online for free.",
  keywords: "Word Counter",
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

