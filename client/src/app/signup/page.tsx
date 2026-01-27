"use client"

import { useEffect } from "react"
import Link from "next/link"

import SignupForm from "@/components/Auth/signup-form"
import { useAppSelector } from "@/app/redux"

export default function SignupPage() {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-900 dark:bg-dark-bg dark:text-gray-100">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join us today to get started
          </p>
        </div>

        {/* Form Card */}
        <SignupForm />

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
