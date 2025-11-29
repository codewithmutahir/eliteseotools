import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Free Plagiarism Checker Online | Elitesolution USA",
  description: "Detect copied content instantly with the Best Free Plagiarism Checker online. Ensure originality and protect your work effortlessly",
  keywords: "Best Free Plagiarism Checker",
  openGraph: {
    title: "Best Free Plagiarism Checker Online | Elitesolution USA",
    description: "Detect copied content instantly with the Best Free Plagiarism Checker online. Ensure originality and protect your work effortlessly",
    url: "https://seotools.elitesolutionusa.com/tools/plagiarism-checker",
    siteName: "Elitesolution USA",
    type: "website",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Plagiarism Checker Online | Elitesolution USA",
    description: "Detect copied content instantly with the Best Free Plagiarism Checker online. Ensure originality and protect your work effortlessly",
    images: ["https://khaki-worm-335413.hostingersite.com/wp-content/uploads/2024/11/cropped-kyMDfk.png"],
  },
}

export default function PlagiarismCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
