import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Elite SEO Suite</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive collection of AI-powered and text processing tools
              to help you with content creation, SEO, and text manipulation.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Popular Tools</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/tools/paraphraser" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Paraphrasing Tool
              </Link>
              <Link href="/tools/grammar-checker" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Grammar Checker
              </Link>
              <Link href="/tools/word-counter" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Word Counter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Elite Solutions. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://elitesolutionusa.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              elitesolutionusa.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

