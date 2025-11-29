import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free JSON Formatter / Beautifier Online | Elitesolution USA",
  description: "Use our JSON Formatter / Beautifier to easily format, beautify, and validate JSON data online for cleaner and readable results.",
  keywords: "JSON Formatter",
  openGraph: {
    title: "Best Free JSON Formatter / Beautifier Online | Elitesolution USA",
    description: "Use our JSON Formatter / Beautifier to easily format, beautify, and validate JSON data online for cleaner and readable results.",
    url: "https://seotools.elitesolutionusa.com/tools/json-formatter",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free JSON Formatter / Beautifier Online | Elitesolution USA",
    description: "Use our JSON Formatter / Beautifier to easily format, beautify, and validate JSON data online for cleaner and readable results.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
