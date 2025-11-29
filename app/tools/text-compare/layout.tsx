import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Text Compare Tool Online | Elitesolution USA",
  description: "Quickly find differences between texts with our easy-to-use Text Compare Tool. Compare content accurately in seconds.",
  keywords: "Text Compare Tool",
  openGraph: {
    title: "Free Text Compare Tool Online | Elitesolution USA",
    description: "Quickly find differences between texts with our easy-to-use Text Compare Tool. Compare content accurately in seconds.",
    url: "https://seotools.elitesolutionusa.com/tools/text-compare",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text Compare Tool Online | Elitesolution USA",
    description: "Quickly find differences between texts with our easy-to-use Text Compare Tool. Compare content accurately in seconds.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function TextCompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

