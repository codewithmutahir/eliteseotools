"use client"

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md"
            >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sign In Required</CardTitle>
                    <CardDescription>
                      Please sign in to download or save your results
                    </CardDescription>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SignedOut>
                  <div className="space-y-3">
                    <SignInButton 
                      mode="modal" 
                      forceRedirectUrl={typeof window !== 'undefined' ? window.location.href : '/'}
                    >
                      <Button className="w-full" size="lg">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton 
                      mode="modal" 
                      forceRedirectUrl={typeof window !== 'undefined' ? window.location.href : '/'}
                    >
                      <Button variant="outline" className="w-full" size="lg">
                        Create Account
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      You're signed in! You can now download your results.
                    </p>
                    <Button onClick={onSuccess} className="w-full" size="lg">
                      Continue
                    </Button>
                  </div>
                </SignedIn>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

