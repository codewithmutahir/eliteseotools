import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Sort Lines Tool | Elitesolution USA",
  description: "Easily organize text with our free online Sort Lines tool – sort, reorder, and manage your lines quickly and efficiently.",
  keywords: "Sort Lines",
  openGraph: {
    title: "Free Online Sort Lines Tool | Elitesolution USA",
    description: "Easily organize text with our free online Sort Lines tool – sort, reorder, and manage your lines quickly and efficiently.",
    url: "https://seotools.elitesolutionusa.com/tools/sort-lines",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Sort Lines Tool | Elitesolution USA",
    description: "Easily organize text with our free online Sort Lines tool – sort, reorder, and manage your lines quickly and efficiently.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function SortLinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

