import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Reverse Text Tool | Elitesolution USA",
  description: "Use our Reverse Text Tool to quickly flip any text instantly. Simple, fast, and free online tool for reversing text effortlessly.",
  keywords: "Reverse Text Tool",
  openGraph: {
    title: "Free Online Reverse Text Tool | Elitesolution USA",
    description: "Use our Reverse Text Tool to quickly flip any text instantly. Simple, fast, and free online tool for reversing text effortlessly.",
    url: "https://seotools.elitesolutionusa.com/tools/reverse-text",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Reverse Text Tool | Elitesolution USA",
    description: "Use our Reverse Text Tool to quickly flip any text instantly. Simple, fast, and free online tool for reversing text effortlessly.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function ReverseTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

