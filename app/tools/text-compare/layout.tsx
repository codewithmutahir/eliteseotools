import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Text Compare Tool Online | Elitesolution USA",
  description: "Quickly find differences between texts with our easy-to-use Text Compare Tool. Compare content accurately in seconds.",
  keywords: "Text Compare Tool",
}

export default function TextCompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

