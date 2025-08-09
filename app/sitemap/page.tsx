import Link from "next/link"
import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-blue-600 hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/domain-registration" className="text-blue-600 hover:underline">
                    Domain Registration
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-hosting" className="text-blue-600 hover:underline">
                    Web Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/services/vps-hosting" className="text-blue-600 hover:underline">
                    VPS Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/services/dedicated-servers" className="text-blue-600 hover:underline">
                    Dedicated Servers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Support</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-blue-600 hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/support/knowledge-base" className="text-blue-600 hover:underline">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link href="/support/tutorials" className="text-blue-600 hover:underline">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact" className="text-blue-600 hover:underline">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Account</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="text-blue-600 hover:underline">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/client" className="text-blue-600 hover:underline">
                    Client Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms-conditions" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="text-blue-600 hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/acceptable-use" className="text-blue-600 hover:underline">
                    Acceptable Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}
