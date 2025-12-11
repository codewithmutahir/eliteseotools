import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Domain Authority Checker | Free SEO Tool | Elitesolution USA",
  description: "Check domain authority, backlinks, and referring domains for any website. Free domain authority checker powered by DataForSEO API. Similar to MozBar metrics.",
  keywords: "domain authority checker, backlinks checker, referring domains, domain rank, SEO tool, free domain authority",
  openGraph: {
    title: "Domain Authority Checker | Free SEO Tool | Elitesolution USA",
    description: "Check domain authority, backlinks, and referring domains for any website. Free domain authority checker powered by DataForSEO API.",
    url: "https://seotools.elitesolutionusa.com/tools/domain",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domain Authority Checker | Free SEO Tool | Elitesolution USA",
    description: "Check domain authority, backlinks, and referring domains for any website. Free domain authority checker powered by DataForSEO API.",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function DomainAuthorityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

