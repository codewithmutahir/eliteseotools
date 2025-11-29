import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Online Text Expander Tool | Elitesolution USA",
  description: "Boost your typing speed and productivity with the Best Text Expander Tool. Save time and streamline your writing effortlessly.",
  keywords: "Best Text Expander Tool",
}

export default function TextExpanderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

