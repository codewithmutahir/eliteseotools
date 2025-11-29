import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Extra Spaces | Elitesolution USA",
  description: "Easily clean your text online with our Remove Extra Spaces tool. Format content fast and hassle-free for better readability.",
  keywords: "Remove Extra Spaces",
}

export default function RemoveSpacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

