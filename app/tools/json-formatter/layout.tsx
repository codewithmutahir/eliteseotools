import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free JSON Formatter / Beautifier Online | Elitesolution USA",
  description: "Use our JSON Formatter / Beautifier to easily format, beautify, and validate JSON data online for cleaner and readable results.",
  keywords: "JSON Formatter",
}

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

