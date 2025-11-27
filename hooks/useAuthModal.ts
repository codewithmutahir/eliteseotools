"use client"

import { useState, useCallback, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null)
  const { isSignedIn, isLoaded } = useAuth()

  // Wait for auth to load before checking
  useEffect(() => {
    if (isLoaded && isSignedIn && isOpen && onSuccessCallback) {
      // User just signed in, execute callback
      onSuccessCallback()
      setIsOpen(false)
      setOnSuccessCallback(null)
    }
  }, [isLoaded, isSignedIn, isOpen, onSuccessCallback])

  const requireAuth = useCallback((onSuccess?: () => void) => {
    // Wait for auth to load
    if (!isLoaded) {
      // Still loading, wait a bit
      setTimeout(() => requireAuth(onSuccess), 100)
      return
    }

    if (isSignedIn) {
      // User is already signed in, execute callback immediately
      onSuccess?.()
      return
    }
    
    // User not signed in, show modal
    setOnSuccessCallback(() => onSuccess || null)
    setIsOpen(true)
  }, [isSignedIn, isLoaded])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setOnSuccessCallback(null)
  }, [])

  const handleSuccess = useCallback(() => {
    if (onSuccessCallback) {
      onSuccessCallback()
    }
    setIsOpen(false)
    setOnSuccessCallback(null)
  }, [onSuccessCallback])

  return {
    isOpen,
    requireAuth,
    handleClose,
    handleSuccess,
  }
}

