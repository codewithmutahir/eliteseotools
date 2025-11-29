import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Elitesolution USA",
  description: "Contact Us for expert SEO tools and support. Reach out today to get personalized solutions that elevate your digital marketing success.",
  keywords: "Contact Us",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (832) 951-2823</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available during business hours
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">info@elitesolutionscpa.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-muted-foreground">1558 Fairway Dr, Naperville, IL 60563, USA</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Globe className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Website</h3>
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
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Are these tools free to use?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! All tools are completely free to use. Some AI-powered tools may have usage limits based on service availability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is my data stored or logged?</h3>
              <p className="text-muted-foreground text-sm">
                No. Text processing tools run entirely in your browser. AI tools use secure, encrypted connections and we don't store your content.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I use these tools for commercial purposes?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, you can use all tools for both personal and commercial projects.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How can I report a bug or request a feature?</h3>
              <p className="text-muted-foreground text-sm">
                Please email us at info@elitesolutionscpa.com with your feedback or feature requests.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

