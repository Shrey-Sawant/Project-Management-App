"use client"

import { useAuth } from "@/state/auth-context"
import { useRouter } from "next/navigation"
import LoginPage from "./login/page"
import HomePage from "./home/page"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <HomePage /> : <LoginPage />
}
