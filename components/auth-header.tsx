"use client"

import type React from "react"

import Link from "next/link"
import { Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthHeaderProps {
  showBackButton?: boolean
  backHref?: string
  rightContent?: React.ReactNode
}

export function AuthHeader({ showBackButton = true, backHref = "/", rightContent }: AuthHeaderProps) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Back button or Logo */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="font-bold text-xl">
                <span className="text-blue-600">Trust Host</span>
                <span className="text-gray-800"> Pro</span>
              </div>
            </Link>
          </div>

          {/* Right side - Custom content or default links */}
          <div className="flex items-center space-x-4">
            {rightContent || (
              <>
                <Link href="/support" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Support
                </Link>
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
