import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Text Case Converter Online | Elitesolution USA",
  description: "Easily change text formats with our Text Case Converter. Convert uppercase, lowercase, title case, and more in seconds.",
  keywords: "Text Case Converter",
}

export default function TextCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

