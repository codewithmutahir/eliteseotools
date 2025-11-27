"use client"

import { useAuth } from "@clerk/nextjs"

/**
 * Hook to check if user is authenticated
 * Returns true if authenticated, false otherwise
 */
export function useRequireAuth() {
  const { isSignedIn, isLoaded } = useAuth()
  
  return {
    isAuthenticated: isLoaded && isSignedIn === true,
    isLoading: !isLoaded,
    isSignedIn: isSignedIn === true,
  }
}

