"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Globe, CheckCircle, XCircle, ShoppingCart, Star, TrendingUp, Zap, Shield, Clock } from "lucide-react"
import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"

interface DomainResult {
  domain: string
  available: boolean
  price: number
  premium?: boolean
  popular?: boolean
}

export default function DomainSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [cart, setCart] = useState<DomainResult[]>([])

  const popularTlds = [
    { extension: ".com", price: 12.99, description: "Most popular and trusted" },
    { extension: ".org", price: 14.99, description: "Perfect for organizations" },
    { extension: ".net", price: 13.99, description: "Great for networks" },
    { extension: ".info", price: 9.99, description: "Information websites" },
    { extension: ".biz", price: 11.99, description: "Business websites" },
    { extension: ".co", price: 24.99, description: "Modern alternative to .com" },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const mockResults: DomainResult[] = [
        { domain: `${searchTerm}.com`, available: Math.random() > 0.5, price: 12.99, popular: true },
        { domain: `${searchTerm}.org`, available: Math.random() > 0.5, price: 14.99 },
        { domain: `${searchTerm}.net`, available: Math.random() > 0.5, price: 13.99 },
        { domain: `${searchTerm}.info`, available: Math.random() > 0.5, price: 9.99 },
        { domain: `${searchTerm}.biz`, available: Math.random() > 0.5, price: 11.99 },
        { domain: `${searchTerm}.co`, available: Math.random() > 0.5, price: 24.99, premium: true },
        { domain: `${searchTerm}pro.com`, available: true, price: 12.99 },
        { domain: `get${searchTerm}.com`, available: true, price: 12.99 },
      ]
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const addToCart = (domain: DomainResult) => {
    if (!cart.find((item) => item.domain === domain.domain)) {
      setCart([...cart, domain])
    }
  }

  const removeFromCart = (domainName: string) => {
    setCart(cart.filter((item) => item.domain !== domainName))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TwoLayerHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              Find Your Perfect Domain
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Search for available domain names and secure your online presence today. Over 500 TLD extensions available
              with instant registration.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-12 shadow-xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your domain name (e.g., mybusiness)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-14 text-lg"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search Domains
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {popularTlds.slice(0, 4).map((tld) => (
                    <Button
                      key={tld.extension}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchTerm(searchTerm + tld.extension)}
                      className="text-xs"
                    >
                      {tld.extension} - ${tld.price}
                    </Button>
                  ))}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Search Results */}
            <div className="lg:col-span-2">
              {searchResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Search Results for "{searchTerm}"
                    </CardTitle>
                    <CardDescription>
                      {searchResults.filter((r) => r.available).length} domains available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="available" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="available">
                          Available ({searchResults.filter((r) => r.available).length})
                        </TabsTrigger>
                        <TabsTrigger value="unavailable">
                          Unavailable ({searchResults.filter((r) => !r.available).length})
                        </TabsTrigger>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                      </TabsList>

                      <TabsContent value="available" className="space-y-3">
                        {searchResults
                          .filter((result) => result.available)
                          .map((result) => (
                            <div
                              key={result.domain}
                              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                  <p className="font-semibold text-lg">{result.domain}</p>
                                  <div className="flex items-center gap-2">
                                    {result.popular && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        <Star className="h-3 w-3 mr-1" />
                                        Popular
                                      </Badge>
                                    )}
                                    {result.premium && (
                                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                        <Zap className="h-3 w-3 mr-1" />
                                        Premium
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="text-2xl font-bold">${result.price}</p>
                                  <p className="text-sm text-gray-500">/year</p>
                                </div>
                                <Button
                                  onClick={() => addToCart(result)}
                                  disabled={cart.some((item) => item.domain === result.domain)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {cart.some((item) => item.domain === result.domain) ? (
                                    <>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Added
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="mr-2 h-4 w-4" />
                                      Add to Cart
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))}
                      </TabsContent>

                      <TabsContent value="unavailable" className="space-y-3">
                        {searchResults
                          .filter((result) => !result.available)
                          .map((result) => (
                            <div
                              key={result.domain}
                              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                            >
                              <div className="flex items-center gap-3">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <div>
                                  <p className="font-semibold text-lg text-gray-600">{result.domain}</p>
                                  <p className="text-sm text-gray-500">This domain is not available</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  Check WHOIS
                                </Button>
                                <Button variant="outline" size="sm">
                                  Get Notified
                                </Button>
                              </div>
                            </div>
                          ))}
                      </TabsContent>

                      <TabsContent value="suggestions" className="space-y-3">
                        <div className="text-center py-8">
                          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Alternative Suggestions</h3>
                          <p className="text-gray-600 mb-4">Try different variations or extensions</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            <Button variant="outline" onClick={() => setSearchTerm(`get${searchTerm}`)}>
                              get{searchTerm}.com
                            </Button>
                            <Button variant="outline" onClick={() => setSearchTerm(`${searchTerm}pro`)}>
                              {searchTerm}pro.com
                            </Button>
                            <Button variant="outline" onClick={() => setSearchTerm(`${searchTerm}hub`)}>
                              {searchTerm}hub.com
                            </Button>
                            <Button variant="outline" onClick={() => setSearchTerm(`${searchTerm}zone`)}>
                              {searchTerm}zone.com
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Popular TLDs */}
              {searchResults.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Popular Domain Extensions
                    </CardTitle>
                    <CardDescription>Choose from our most popular domain extensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {popularTlds.map((tld) => (
                        <div
                          key={tld.extension}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div>
                            <p className="font-semibold text-lg">{tld.extension}</p>
                            <p className="text-sm text-gray-600">{tld.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">${tld.price}</p>
                            <p className="text-sm text-gray-500">/year</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Shopping Cart */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Shopping Cart ({cart.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Your cart is empty</p>
                      <p className="text-sm text-gray-500">Add domains to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.domain} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.domain}</p>
                            <p className="text-sm text-gray-500">${item.price}/year</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.domain)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total:</span>
                          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Free Privacy Protection</p>
                      <p className="text-sm text-gray-600">Keep your personal info private</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Instant Activation</p>
                      <p className="text-sm text-gray-600">Your domain is ready immediately</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Easy Management</p>
                      <p className="text-sm text-gray-600">Simple DNS and domain controls</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}
