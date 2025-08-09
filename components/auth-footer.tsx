"use client"

import Link from "next/link"
import { Globe, Shield, Clock, HeadphonesIcon } from "lucide-react"

export function AuthFooter() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      {/* Trust Indicators */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Secure & Encrypted</h3>
            <p className="text-sm text-gray-600">Your data is protected with industry-standard encryption</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Clock className="h-8 w-8 text-green-600" />
            <h3 className="font-semibold text-gray-900">99.9% Uptime</h3>
            <p className="text-sm text-gray-600">Reliable hosting services you can count on</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <HeadphonesIcon className="h-8 w-8 text-purple-600" />
            <h3 className="font-semibold text-gray-900">24/7 Support</h3>
            <p className="text-sm text-gray-600">Expert help whenever you need it</p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Trust Host Pro</span>
            </Link>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center space-x-6 text-sm">
              <Link href="/terms-conditions" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/support/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Support
              </Link>
              <Link href="/status" className="text-gray-600 hover:text-blue-600 transition-colors">
                Status
              </Link>
            </nav>

            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Trust Host Pro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
