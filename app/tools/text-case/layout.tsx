import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Text Case Converter Online | Elitesolution USA",
  description: "Easily change text formats with our Text Case Converter. Convert uppercase, lowercase, title case, and more in seconds.",
  keywords: "Text Case Converter",
  openGraph: {
    title: "Best Free Text Case Converter Online | Elitesolution USA",
    description: "Easily change text formats with our Text Case Converter. Convert uppercase, lowercase, title case, and more in seconds.",
    url: "https://seotools.elitesolutionusa.com/tools/text-case",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Text Case Converter Online | Elitesolution USA",
    description: "Easily change text formats with our Text Case Converter. Convert uppercase, lowercase, title case, and more in seconds.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function TextCaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
