import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Reverse Text Tool | Elitesolution USA",
  description: "Use our Reverse Text Tool to quickly flip any text instantly. Simple, fast, and free online tool for reversing text effortlessly.",
  keywords: "Reverse Text Tool",
}

export default function ReverseTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

