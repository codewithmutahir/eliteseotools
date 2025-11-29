import { Metadata } from "next"

export const metadata: Metadata = {
  title: "HTML Cleaner — Clean & Format HTML | Elitesolution USA",
  description: "Use our HTML Cleaner to quickly clean, format, and optimize your HTML code for better readability and performance online.",
  keywords: "HTML Cleaner",
  openGraph: {
    title: "HTML Cleaner — Clean & Format HTML | Elitesolution USA",
    description: "Use our HTML Cleaner to quickly clean, format, and optimize your HTML code for better readability and performance online.",
    url: "https://seotools.elitesolutionusa.com/tools/html-cleaner",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Cleaner — Clean & Format HTML | Elitesolution USA",
    description: "Use our HTML Cleaner to quickly clean, format, and optimize your HTML code for better readability and performance online.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function HTMLCleanerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
