import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Zap, Crown, ArrowRight } from "lucide-react"

export function ModernPricingCards() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for personal websites",
      price: 5.99,
      originalPrice: 11.99,
      icon: Star,
      popular: false,
      features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "24/7 Support", "99.9% Uptime"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Business",
      description: "Ideal for growing businesses",
      price: 12.99,
      originalPrice: 25.99,
      icon: Zap,
      popular: true,
      features: [
        "Unlimited Websites",
        "50 GB SSD Storage",
        "Free Domain (1st year)",
        "Priority Support",
        "Daily Backups",
      ],
      buttonText: "Most Popular",
      buttonVariant: "default" as const,
    },
    {
      name: "Pro",
      description: "For high-traffic sites",
      price: 24.99,
      originalPrice: 49.99,
      icon: Crown,
      popular: false,
      features: ["Unlimited Websites", "100 GB SSD Storage", "Free Domain + CDN", "VIP Support", "Advanced Analytics"],
      buttonText: "Go Pro",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto mt-12">
      {plans.map((plan) => {
        const IconComponent = plan.icon
        return (
          <Card
            key={plan.name}
            className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              plan.popular
                ? "border-2 border-blue-500 shadow-xl scale-105"
                : "border border-gray-200 hover:border-blue-300"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 text-sm font-semibold shadow-lg">
                  🔥 Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4 pt-8">
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-full ${plan.popular ? "bg-blue-100" : "bg-gray-100"}`}>
                  <IconComponent className={`h-6 w-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                </div>
              </div>

              <CardTitle className="text-xl font-bold mb-1">{plan.name}</CardTitle>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

              <div className="space-y-1">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-red-500 line-through">${plan.originalPrice}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                    Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-11 font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    : plan.buttonVariant === "outline"
                      ? "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
                variant={plan.popular ? "default" : plan.buttonVariant}
              >
                {plan.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">30-day money-back guarantee</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
