"use client"

import { ReactNode } from "react"
import { useAuthModal } from "@/hooks/useAuthModal"
import { AuthModal } from "./AuthModal"

interface ProtectedActionProps {
  children: ReactNode
  onAction: () => void
  actionLabel?: string
}

export function ProtectedAction({ children, onAction, actionLabel }: ProtectedActionProps) {
  const { isOpen, requireAuth, handleClose, handleSuccess } = useAuthModal()

  const handleClick = () => {
    requireAuth(onAction)
  }

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      <AuthModal 
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  )
}

