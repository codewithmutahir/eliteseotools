import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ReactNode } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Free Online SEO Tool Suite | Elitesolution USA",
  description: "Boost your website's performance with our advanced SEO Tool designed to analyze rankings, optimize content, and drive organic traffic.",
  keywords: "SEO Tool",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://seotools.elitesolutionusa.com'),
  verification: {
    google: "jnsYszeElPx3OMtH10GeVUNtkmEaDd7AfFJom2aBLow",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

