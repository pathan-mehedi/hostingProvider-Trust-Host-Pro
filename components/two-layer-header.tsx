"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Phone, Mail, Menu, X, ChevronDown } from "lucide-react"
import { MegaMenu } from "./mega-menu"

export function TwoLayerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  const handleMenuEnter = (menuKey: string) => {
    setActiveMenu(menuKey)
    setIsMegaMenuOpen(true)
  }

  const handleMenuLeave = () => {
    // Remove the timeout - let the mega menu handle its own closing
    // This prevents premature closing when moving to mega menu
  }

  const handleMegaMenuLeave = () => {
    // Close menu when actually leaving the mega menu area
    setActiveMenu(null)
    setIsMegaMenuOpen(false)
  }

  const handleMegaMenuEnter = () => {
    // Handle mega menu enter logic here
  }

  return (
    <header className="w-full">
      {/* Top Layer - Contact Info & Quick Links */}
      <div className="bg-gray-900 text-white py-2 px-4 lg:px-6 hidden md:block">
        <div className="container mx-auto max-w-7xl flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <span>+880 1723456789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span>info@trusthostpro.com</span>
            </div>
          </div>

          {/* Running News Ticker */}
          <div className="flex-1 mx-8 overflow-hidden">
            <div className="flex items-center">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold mr-3 whitespace-nowrap">
                🔥 HOT
              </span>
              <div className="overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-yellow-300 font-medium">
                    🎉 Black Friday Sale: 70% OFF All Hosting Plans | 🚀 New Data Center in Singapore Now Live | 💡 Free
                    SSL Certificates for All New Customers | ⚡ 99.99% Uptime Achievement This Month | 🎯 24/7 Live Chat
                    Support Now Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-600 text-white hover:bg-green-700">
              🎉 50% OFF First Year
            </Badge>
            <Link href="/auth/login" className="hover:text-blue-300 transition-colors">
              Client Login
            </Link>
            <Link href="/support" className="hover:text-blue-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Layer */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40 relative">
        <div className="container mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 font-bold text-xl">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-blue-600">Trust Host</span>
                <span className="text-gray-800"> Pro</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 relative">
              {[
                { name: "Domains", key: "domains" },
                { name: "Web Hosting", key: "hosting" },
                { name: "Servers", key: "servers" },
                { name: "Email & Security", key: "security" },
                { name: "Support & Resources", key: "support" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(item.key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative px-4 py-2 rounded-md hover:bg-blue-50">
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeMenu === item.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
              
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/domains/search"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Domains
                </Link>
                <Link
                  href="/hosting/shared"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Web Hosting
                </Link>
                <Link
                  href="/servers/vps"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Servers
                </Link>
                <Link
                  href="/email/business"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Email & Security
                </Link>
                <Link
                  href="/support/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Support & Resources
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Mega Menu */}
        <div
          className={`absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
            isMegaMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
          }`}
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <MegaMenu isOpen={isMegaMenuOpen} onClose={handleMegaMenuLeave} activeMenu={activeMenu} />
        </div>
      </div>
    </header>
  )
}
