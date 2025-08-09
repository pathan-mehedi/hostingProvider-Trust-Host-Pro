"use client"
import Link from "next/link"
import type React from "react"

import { Globe, Server, Shield, HelpCircle, ArrowRight, Sparkles } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  activeMenu: string | null
}

export function MegaMenu({ isOpen, onClose, activeMenu }: MegaMenuProps) {
  if (!isOpen || !activeMenu) return null

  const handleLinkClick = (e: React.MouseEvent) => {
    // Don't prevent default - allow normal navigation
    // Just close the menu after a small delay to allow navigation
    setTimeout(() => {
      onClose()
    }, 100)
  }

  const menuContent = {
    domains: {
      title: "Domains",
      icon: Globe,
      description: "Register, transfer, and manage your domain names",
      gradient: "from-blue-500 to-cyan-500",
      items: [
        {
          title: "Domain Search",
          description: "Find and register your perfect domain name",
          href: "/domains/search",
          featured: true,
          icon: "🔍",
        },
        {
          title: "Domain Transfer",
          description: "Transfer your domain to Trust Host Pro",
          href: "/domains/transfer",
          icon: "🔄",
        },
        {
          title: "Domain Pricing",
          description: "View pricing for all available TLDs",
          href: "/domains/pricing",
          icon: "💰",
        },
        {
          title: "Domain Privacy",
          description: "Protect your personal information",
          href: "/domains/privacy",
          icon: "🛡️",
        },
        {
          title: "WHOIS Lookup",
          description: "Free domain information lookup tool",
          href: "/domains/whois",
          icon: "🔎",
        },
      ],
    },
    hosting: {
      title: "Web Hosting",
      icon: Server,
      description: "Fast, reliable web hosting solutions",
      gradient: "from-green-500 to-emerald-500",
      items: [
        {
          title: "Shared Hosting",
          description: "Perfect for personal websites and small businesses",
          href: "/hosting/shared",
          featured: true,
          icon: "🌐",
        },
        {
          title: "Managed WordPress Hosting",
          description: "Optimized hosting for WordPress websites",
          href: "/hosting/wordpress",
          icon: "📝",
        },
        {
          title: "Reseller Hosting",
          description: "Start your own hosting business",
          href: "/hosting/reseller",
          icon: "💼",
        },
        {
          title: "Hosting Features",
          description: "Complete breakdown of all hosting features",
          href: "/hosting/features",
          icon: "⚡",
        },
      ],
    },
    servers: {
      title: "Servers",
      icon: Server,
      description: "Powerful server solutions for demanding applications",
      gradient: "from-purple-500 to-violet-500",
      items: [
        {
          title: "VPS Hosting",
          description: "Virtual Private Servers with full control",
          href: "/servers/vps",
          featured: true,
          icon: "🖥️",
        },
        {
          title: "Dedicated Servers",
          description: "High-performance dedicated hardware",
          href: "/servers/dedicated",
          icon: "🏢",
        },
        {
          title: "Server Management",
          description: "Professional server management services",
          href: "/servers/management",
          icon: "⚙️",
        },
      ],
    },
    security: {
      title: "Email & Security",
      icon: Shield,
      description: "Secure your website and communications",
      gradient: "from-orange-500 to-red-500",
      items: [
        {
          title: "Business Email",
          description: "Professional email hosting solutions",
          href: "/email/business",
          featured: true,
          icon: "📧",
        },
        {
          title: "SSL Certificates",
          description: "Secure your website with SSL/TLS certificates",
          href: "/security/ssl",
          icon: "🔒",
        },
        {
          title: "Site Security",
          description: "Website protection and malware removal",
          href: "/security/website",
          icon: "🛡️",
        },
        {
          title: "Backup Solutions",
          description: "Automated backup and recovery services",
          href: "/security/backup",
          icon: "💾",
        },
      ],
    },
    support: {
      title: "Support & Resources",
      icon: HelpCircle,
      description: "Get help and learn more about our services",
      gradient: "from-pink-500 to-rose-500",
      items: [
        {
          title: "Contact Us",
          description: "Get in touch with our support team",
          href: "/support/contact",
          featured: true,
          icon: "💬",
        },
        {
          title: "Knowledge Base",
          description: "Guides, tutorials, and documentation",
          href: "/support/knowledge-base",
          icon: "📚",
        },
        {
          title: "Service Status",
          description: "Real-time status of our services",
          href: "/support/status",
          icon: "📊",
        },
        {
          title: "Blog",
          description: "Latest news and insights on web hosting",
          href: "/blog",
          icon: "✍️",
        },
      ],
    },
  }

  const menu = menuContent[activeMenu as keyof typeof menuContent]
  if (!menu) return null

  const IconComponent = menu.icon

  return (
    <div className="bg-white/95 backdrop-blur-xl border-t shadow-2xl z-50 animate-in slide-in-from-top-2 duration-500">
      <div className="container mx-auto max-w-7xl px-4 py-8" onMouseLeave={onClose}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Menu Header - Enhanced */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 border border-gray-100 shadow-sm">
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -translate-y-16 translate-x-16"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${menu.gradient} shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{menu.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{menu.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="h-4 w-4" />
                    <span>Trusted by 10,000+ customers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>99.9% uptime guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items - Enhanced Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menu.items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    item.featured
                      ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={handleLinkClick}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="relative p-5">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-sm">
                            {item.title}
                          </h4>
                          <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Need help choosing?</p>
                  <p className="text-xs text-gray-600">Our experts are here to help</p>
                </div>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={handleLinkClick}
                >
                  Get Help
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
