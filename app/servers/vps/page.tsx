import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Server, Zap, Shield, Settings } from "lucide-react"

export default function VPSHostingPage() {
  const vpsPlans = [
    {
      name: "VPS Starter",
      popular: false,
      price: 29.99,
      specs: {
        cpu: "2 vCPU Cores",
        ram: "4 GB RAM",
        storage: "80 GB SSD",
        bandwidth: "2 TB Transfer",
      },
      features: ["Full Root Access", "Ubuntu/CentOS/Debian", "99.9% Uptime SLA", "24/7 Support", "Free Migration"],
    },
    {
      name: "VPS Business",
      popular: true,
      price: 59.99,
      specs: {
        cpu: "4 vCPU Cores",
        ram: "8 GB RAM",
        storage: "160 GB SSD",
        bandwidth: "4 TB Transfer",
      },
      features: [
        "Full Root Access",
        "Ubuntu/CentOS/Debian",
        "99.9% Uptime SLA",
        "Priority Support",
        "Free Migration",
        "cPanel/WHM Available",
      ],
    },
    {
      name: "VPS Pro",
      popular: false,
      price: 119.99,
      specs: {
        cpu: "8 vCPU Cores",
        ram: "16 GB RAM",
        storage: "320 GB SSD",
        bandwidth: "8 TB Transfer",
      },
      features: [
        "Full Root Access",
        "Ubuntu/CentOS/Debian",
        "99.9% Uptime SLA",
        "Priority Support",
        "Free Migration",
        "cPanel/WHM Available",
        "Free Backup Service",
      ],
    },
  ]

  const benefits = [
    {
      icon: Server,
      title: "Full Control",
      description: "Complete root access and administrative privileges on your virtual server",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Enterprise-grade SSD storage and powerful processors for optimal performance",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Isolated environment with advanced security measures and DDoS protection",
    },
    {
      icon: Settings,
      title: "Easy Management",
      description: "Intuitive control panel for server management and monitoring",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">VPS Hosting</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the power and flexibility of a dedicated server at a fraction of the cost. Perfect for growing
              websites and applications.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon
              return (
                <Card key={benefit.title}>
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* VPS Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your VPS Plan</h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {vpsPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-lg" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600">
                      ${plan.price}
                      <span className="text-lg text-gray-500 font-normal">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <strong>CPU:</strong> {plan.specs.cpu}
                        </div>
                        <div>
                          <strong>RAM:</strong> {plan.specs.ram}
                        </div>
                        <div>
                          <strong>Storage:</strong> {plan.specs.storage}
                        </div>
                        <div>
                          <strong>Bandwidth:</strong> {plan.specs.bandwidth}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-blue-600 text-blue-600 hover:bg-blue-50"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-center">Available Operating Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                {["Ubuntu 20.04", "Ubuntu 22.04", "CentOS 7", "CentOS 8", "Debian 10", "Debian 11"].map((os) => (
                  <div key={os} className="text-center p-4 border rounded-lg hover:border-blue-300">
                    <div className="text-2xl mb-2">🐧</div>
                    <div className="font-medium">{os}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <ModernFooter />
    </div>
  )
}
