import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Duplicate Lines | Elitesolution USA",
  description: "Easily Remove Duplicate Lines from your text with our free online tool. Clean, quick, and accurate duplicate line removal.",
  keywords: "Remove Duplicate Lines",
}

export default function DuplicateLinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

