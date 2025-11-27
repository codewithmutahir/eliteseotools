"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useAuth } from "@clerk/nextjs"

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const callbackRef = useRef<(() => void) | null>(null)
  const { isSignedIn, isLoaded } = useAuth()

  // Watch for sign-in while modal is open
  useEffect(() => {
    if (isLoaded && isSignedIn && isOpen && callbackRef.current) {
      // User just signed in, execute callback
      const callback = callbackRef.current
      callbackRef.current = null
      setIsOpen(false)
      // Execute callback after state updates
      setTimeout(() => callback(), 0)
    }
  }, [isLoaded, isSignedIn, isOpen])

  const requireAuth = useCallback((onSuccess?: () => void) => {
    // Wait for auth to load
    if (!isLoaded) {
      setTimeout(() => requireAuth(onSuccess), 100)
      return
    }

    if (isSignedIn) {
      // User is already signed in, execute callback immediately
      onSuccess?.()
      return
    }
    
    // User not signed in, store callback and show modal
    callbackRef.current = onSuccess || null
    setIsOpen(true)
  }, [isSignedIn, isLoaded])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    callbackRef.current = null
  }, [])

  const handleSuccess = useCallback(() => {
    const callback = callbackRef.current
    callbackRef.current = null
    setIsOpen(false)
    // Execute callback after modal closes
    if (callback) {
      setTimeout(() => callback(), 0)
    }
  }, [])

  return {
    isOpen,
    requireAuth,
    handleClose,
    handleSuccess,
  }
}
