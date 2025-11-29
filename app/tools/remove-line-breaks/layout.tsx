import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Line Breaks | Elitesolution USA",
  description: "Easily clean up your text online with our free tool to Remove Line Breaks and format content quickly and efficiently.",
  keywords: "Remove Line Breaks",
  openGraph: {
    title: "Remove Line Breaks | Elitesolution USA",
    description: "Easily clean up your text online with our free tool to Remove Line Breaks and format content quickly and efficiently.",
    url: "https://seotools.elitesolutionusa.com/tools/remove-line-breaks",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Line Breaks | Elitesolution USA",
    description: "Easily clean up your text online with our free tool to Remove Line Breaks and format content quickly and efficiently.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function RemoveLineBreaksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

