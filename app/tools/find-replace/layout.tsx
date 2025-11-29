import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Find and Replace Tool | Elitesolution USA",
  description: "Use our Find and Replace Tool to quickly search and update text across your files with ease and accuracy.",
  keywords: "Find and Replace Tool",
}

export default function FindReplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

