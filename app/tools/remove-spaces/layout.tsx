import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Extra Spaces | Elitesolution USA",
  description: "Easily clean your text online with our Remove Extra Spaces tool. Format content fast and hassle-free for better readability.",
  keywords: "Remove Extra Spaces",
  openGraph: {
    title: "Remove Extra Spaces | Elitesolution USA",
    description: "Easily clean your text online with our Remove Extra Spaces tool. Format content fast and hassle-free for better readability.",
    url: "https://seotools.elitesolutionusa.com/tools/remove-spaces",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Extra Spaces | Elitesolution USA",
    description: "Easily clean your text online with our Remove Extra Spaces tool. Format content fast and hassle-free for better readability.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function RemoveSpacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

