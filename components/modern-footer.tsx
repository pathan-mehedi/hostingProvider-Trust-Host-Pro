import Link from "next/link"
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ModernFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Trust Host Pro</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new features, special offers, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 flex-1"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3 font-bold text-xl">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400">Trust Host</span>
                  <span className="text-white"> Pro</span>
                </div>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted partner for domain registration and web hosting services in Bangladesh since 2015. We
                provide reliable, high-performance, and affordable solutions.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/domain-registration"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Domain Registration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-hosting"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Web Hosting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/vps-hosting"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    VPS Hosting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/dedicated-servers"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Dedicated Servers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ssl-certificates"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    SSL Certificates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/email-hosting"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Email Hosting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/website-builder"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Website Builder
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Resources */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support & Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/knowledge-base"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/tutorials"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    Video Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/webinars" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p>123 Main Street</p>
                    <p>Dhaka 1000, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">+880 1XXXXXXXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">info@trusthostpro.com</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-400 mb-2">Business Hours:</p>
                <p className="text-sm text-gray-300">24/7 Support Available</p>
                <p className="text-sm text-gray-300">Office: 9 AM - 6 PM (GMT+6)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Trust Host Pro. All rights reserved.
            </div>
            <nav className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/terms-conditions" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Refund Policy
              </Link>
              <Link href="/acceptable-use" className="text-gray-400 hover:text-blue-400 transition-colors">
                Acceptable Use
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="bg-gray-950 py-3">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Developed with ❤️ by{" "}
              <Link
                href="https://mehedipathan.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Mehedi Pathan
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
