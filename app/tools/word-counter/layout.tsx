import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Word Counter Online | Elitesolution USA",
  description: "Use our Word Counter tool to quickly count words, characters, and improve your writing efficiency online for free.",
  keywords: "Word Counter",
  openGraph: {
    title: "Best Free Word Counter Online | Elitesolution USA",
    description: "Use our Word Counter tool to quickly count words, characters, and improve your writing efficiency online for free.",
    url: "https://seotools.elitesolutionusa.com/tools/word-counter",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Word Counter Online | Elitesolution USA",
    description: "Use our Word Counter tool to quickly count words, characters, and improve your writing efficiency online for free.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

