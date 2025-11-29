import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Line Breaks | Elitesolution USA",
  description: "Easily clean up your text online with our free tool to Remove Line Breaks and format content quickly and efficiently.",
  keywords: "Remove Line Breaks",
}

export default function RemoveLineBreaksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

