import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Elite SEO Suite",
  description: "Learn more about Elite Solutions and our comprehensive SEO and content tools.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          About Elite SEO Suite
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Elite SEO Suite is a comprehensive platform designed to help content creators, writers, SEO professionals,
                and businesses optimize their online presence. We provide powerful AI-powered tools and text processing utilities
                to streamline your workflow and enhance your content quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Our platform offers a wide range of tools to help you with content creation and optimization:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>AI-Powered Tools:</strong> Paraphrasing, grammar checking, summarization, article rewriting, text expansion, and plagiarism detection</li>
                <li><strong>Text Processing:</strong> Word counting, case conversion, text cleaning, sorting, and formatting tools</li>
                <li><strong>Image Tools:</strong> Compression, resizing, format conversion, and metadata extraction</li>
                <li><strong>PDF Tools:</strong> Merging, splitting, compression, text extraction, and watermarking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (832) 951-2823</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@elitesolutionscpa.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">1558 Fairway Dr, Naperville, IL 60563, USA</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Globe className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Website</p>
                  <a 
                    href="https://elitesolutionusa.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    elitesolutionusa.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We take your privacy seriously. Text processing tools run entirely in your browser for maximum security.
                AI-powered tools use secure, encrypted connections. We don't store or log your content without your explicit
                permission. For more details, please review our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

