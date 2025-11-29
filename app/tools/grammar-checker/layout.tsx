import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Grammer Check | Elitesolution USA",
  description: "Improve your writing instantly with our Free Online Grammer Check – fast, accurate, and easy-to-use grammar correction tool.",
  keywords: "Free Online Grammer Check",
  openGraph: {
    title: "Free Online Grammer Check | Elitesolution USA",
    description: "Improve your writing instantly with our Free Online Grammer Check – fast, accurate, and easy-to-use grammar correction tool.",
    url: "https://seotools.elitesolutionusa.com/tools/grammar-checker",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Grammer Check | Elitesolution USA",
    description: "Improve your writing instantly with our Free Online Grammer Check – fast, accurate, and easy-to-use grammar correction tool.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function GrammarCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

