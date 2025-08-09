import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"
import { ModernPricingCards } from "@/components/modern-pricing-cards"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Shield, Clock, Users } from "lucide-react"

export default function SharedHostingPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "SSD storage and optimized servers ensure your website loads quickly",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "DDoS protection, malware scanning, and automatic security updates",
    },
    {
      icon: Clock,
      title: "99.9% Uptime Guarantee",
      description: "Reliable infrastructure with redundant systems and monitoring",
    },
    {
      icon: Users,
      title: "24/7 Expert Support",
      description: "Our technical team is available round-the-clock to help you",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shared Web Hosting</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfect for personal websites, blogs, and small businesses. Get started with reliable hosting that grows
              with you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.title}>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <IconComponent className="h-12 w-12 text-blue-600 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose Your Hosting Plan</h2>
              <p className="text-gray-600">All plans include our core features with no setup fees</p>
            </div>
            <ModernPricingCards />
          </div>

          {/* What's Included */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">What's Included in All Plans</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Free SSL Certificate",
                  "24/7 Customer Support",
                  "99.9% Uptime Guarantee",
                  "Daily Backups",
                  "cPanel Control Panel",
                  "1-Click WordPress Install",
                  "Free Website Migration",
                  "Email Accounts Included",
                  "Spam Protection",
                  "DDoS Protection",
                  "Malware Scanning",
                  "PHP 8.x Support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Technical Specifications</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Server Technology</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Web Server:</span>
                      <span className="font-medium">LiteSpeed Enterprise</span>
                    </li>
                    <li className="flex justify-between">
                      <span>PHP Versions:</span>
                      <span className="font-medium">7.4 - 8.3</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Database:</span>
                      <span className="font-medium">MySQL 8.0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Operating System:</span>
                      <span className="font-medium">CloudLinux OS</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance Features</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Storage Type:</span>
                      <span className="font-medium">NVMe SSD</span>
                    </li>
                    <li className="flex justify-between">
                      <span>CDN Integration:</span>
                      <span className="font-medium">Cloudflare</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Caching:</span>
                      <span className="font-medium">LiteSpeed Cache</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Data Centers:</span>
                      <span className="font-medium">Global Network</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}
