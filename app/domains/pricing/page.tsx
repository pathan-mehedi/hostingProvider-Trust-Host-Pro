import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DomainPricingPage() {
  const tldCategories = [
    {
      name: "Popular TLDs",
      description: "The most commonly used domain extensions",
      tlds: [
        { ext: ".com", register: 12.99, renew: 14.99, transfer: 12.99, popular: true },
        { ext: ".net", register: 14.99, renew: 16.99, transfer: 14.99, popular: true },
        { ext: ".org", register: 13.99, renew: 15.99, transfer: 13.99, popular: true },
        { ext: ".info", register: 8.99, renew: 18.99, transfer: 8.99 },
        { ext: ".biz", register: 9.99, renew: 19.99, transfer: 9.99 },
        { ext: ".us", register: 11.99, renew: 11.99, transfer: 11.99 },
      ],
    },
    {
      name: "Country Code TLDs",
      description: "Domain extensions for specific countries",
      tlds: [
        { ext: ".bd", register: 49.99, renew: 49.99, transfer: 49.99, new: true },
        { ext: ".uk", register: 12.99, renew: 12.99, transfer: 12.99 },
        { ext: ".ca", register: 15.99, renew: 15.99, transfer: 15.99 },
        { ext: ".au", register: 18.99, renew: 18.99, transfer: 18.99 },
        { ext: ".de", register: 11.99, renew: 11.99, transfer: 11.99 },
        { ext: ".in", register: 12.99, renew: 12.99, transfer: 12.99 },
      ],
    },
    {
      name: "New TLDs",
      description: "Modern domain extensions for specific industries",
      tlds: [
        { ext: ".tech", register: 24.99, renew: 56.99, transfer: 24.99, popular: true },
        { ext: ".online", register: 19.99, renew: 39.99, transfer: 19.99 },
        { ext: ".store", register: 29.99, renew: 59.99, transfer: 29.99 },
        { ext: ".app", register: 18.99, renew: 18.99, transfer: 18.99 },
        { ext: ".blog", register: 29.99, renew: 32.99, transfer: 29.99 },
        { ext: ".io", register: 39.99, renew: 69.99, transfer: 39.99, popular: true },
      ],
    },
    {
      name: "Business TLDs",
      description: "Professional domain extensions for businesses",
      tlds: [
        { ext: ".co", register: 24.99, renew: 32.99, transfer: 24.99, popular: true },
        { ext: ".biz", register: 9.99, renew: 19.99, transfer: 9.99 },
        { ext: ".company", register: 24.99, renew: 24.99, transfer: 24.99 },
        { ext: ".agency", register: 22.99, renew: 22.99, transfer: 22.99 },
        { ext: ".consulting", register: 39.99, renew: 39.99, transfer: 39.99 },
        { ext: ".services", register: 34.99, renew: 34.99, transfer: 34.99 },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Domain Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing for all supported domain extensions. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Note */}
          <Card className="mb-12 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">💰 First Year Pricing</h4>
                  <p className="text-blue-800">Special introductory rates for new registrations</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">🔄 Renewal Rates</h4>
                  <p className="text-blue-800">Standard pricing that applies from the second year</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">↗️ Transfer Pricing</h4>
                  <p className="text-blue-800">Includes 1-year extension when you transfer to us</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Tables */}
          <div className="space-y-12">
            {tldCategories.map((category) => (
              <div key={category.name}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-4 font-semibold">Domain Extension</th>
                            <th className="text-center p-4 font-semibold">Register</th>
                            <th className="text-center p-4 font-semibold">Renew</th>
                            <th className="text-center p-4 font-semibold">Transfer</th>
                            <th className="text-center p-4 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.tlds.map((tld) => (
                            <tr key={tld.ext} className="border-t">
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-semibold text-lg">{tld.ext}</span>
                                  {tld.popular && <Badge className="bg-blue-100 text-blue-800 text-xs">Popular</Badge>}
                                  {tld.new && <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>}
                                </div>
                              </td>
                              <td className="text-center p-4">
                                <span className="font-semibold text-lg">${tld.register}</span>
                                <span className="text-gray-500 text-sm">/year</span>
                              </td>
                              <td className="text-center p-4">
                                <span className="font-semibold text-lg">${tld.renew}</span>
                                <span className="text-gray-500 text-sm">/year</span>
                              </td>
                              <td className="text-center p-4">
                                <span className="font-semibold text-lg">${tld.transfer}</span>
                                <span className="text-gray-500 text-sm">/year</span>
                              </td>
                              <td className="text-center p-4">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Register
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Additional Domain Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Domain Privacy Protection</h4>
                  <p className="text-sm text-gray-600 mb-3">Hide your personal information from WHOIS lookups</p>
                  <p className="text-lg font-bold text-blue-600">$9.99/year</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Premium DNS</h4>
                  <p className="text-sm text-gray-600 mb-3">Enhanced DNS with faster resolution and better uptime</p>
                  <p className="text-lg font-bold text-blue-600">$4.99/month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Domain Lock Plus</h4>
                  <p className="text-sm text-gray-600 mb-3">Advanced security features and transfer protection</p>
                  <p className="text-lg font-bold text-blue-600">$14.99/year</p>
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
