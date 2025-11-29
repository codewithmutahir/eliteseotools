import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Grammer Check | Elitesolution USA",
  description: "Improve your writing instantly with our Free Online Grammer Check – fast, accurate, and easy-to-use grammar correction tool.",
  keywords: "Free Online Grammer Check",
}

export default function GrammarCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

