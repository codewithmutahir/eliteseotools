import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Sort Lines Tool | Elitesolution USA",
  description: "Easily organize text with our free online Sort Lines tool – sort, reorder, and manage your lines quickly and efficiently.",
  keywords: "Sort Lines",
}

export default function SortLinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

