import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Online Text Expander Tool | Elitesolution USA",
  description: "Boost your typing speed and productivity with the Best Text Expander Tool. Save time and streamline your writing effortlessly.",
  keywords: "Best Text Expander Tool",
  openGraph: {
    title: "Best Free Online Text Expander Tool | Elitesolution USA",
    description: "Boost your typing speed and productivity with the Best Text Expander Tool. Save time and streamline your writing effortlessly.",
    url: "https://seotools.elitesolutionusa.com/tools/text-expander",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Online Text Expander Tool | Elitesolution USA",
    description: "Boost your typing speed and productivity with the Best Text Expander Tool. Save time and streamline your writing effortlessly.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function TextExpanderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

