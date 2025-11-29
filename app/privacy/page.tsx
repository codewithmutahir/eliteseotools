import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Elitesolution USA",
  description: "Explore our Privacy Policy to understand how we securely collect, use, and protect your personal data with complete transparency.",
  keywords: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Elite Solutions ("we," "our," or "us") operates Elite SEO Suite (the "Service"). This Privacy Policy
                informs you of our policies regarding the collection, use, and disclosure of personal data when you use
                our Service and the choices you have associated with that data.
              </p>
              <p>
                We are committed to protecting your privacy and ensuring the security of your personal information. By
                using our Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p><strong>Personal Information:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address (when you create an account)</li>
                <li>Authentication information (managed securely through Clerk)</li>
                <li>Usage data and preferences</li>
              </ul>
              <p className="mt-4"><strong>Content Data:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Text, images, and PDFs you upload for processing</li>
                <li>Processing results and outputs</li>
                <li>Tool usage history (if you're signed in)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our Service</li>
                <li>To process your requests and deliver tool results</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                <strong>Local Processing:</strong> Many of our tools process data entirely in your browser. This means
                your content never leaves your device for these operations.
              </p>
              <p>
                <strong>AI-Powered Tools:</strong> When using AI-powered features, your content is sent to secure,
                encrypted AI service providers for processing. We do not store this content on our servers.
              </p>
              <p>
                <strong>Account Data:</strong> If you create an account, your authentication information is securely
                managed by Clerk, a trusted authentication provider. We do not store passwords or sensitive authentication
                data on our servers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We retain your personal information only for as long as necessary to provide you with our Service and
                fulfill the purposes described in this Privacy Policy. Content you process through our tools is not stored
                on our servers unless you explicitly save it to your account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Our Service may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these third parties. We encourage you to read their privacy policies.</p>
              <p><strong>Service Providers:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Clerk:</strong> Authentication and user management</li>
                <li><strong>AI Service Providers:</strong> For AI-powered tool processing</li>
                <li><strong>Analytics Services:</strong> To understand how our Service is used</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="space-y-2">
                <p><strong>Elite Solutions</strong></p>
                <p>1558 Fairway Dr, Naperville, IL 60563, USA</p>
                <p>Phone: +1 (832) 951-2823</p>
                <p>Email: info@elitesolutionscpa.com</p>
                <p>Website: <a href="https://elitesolutionusa.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">elitesolutionusa.com</a></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Updated</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

