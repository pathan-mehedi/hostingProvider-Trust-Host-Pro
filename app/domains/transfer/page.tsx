"use client"

import { useState } from "react"
import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Shield, Clock, DollarSign } from "lucide-react"

export default function DomainTransferPage() {
  const [domain, setDomain] = useState("")

  return (
    <div className="min-h-screen flex flex-col w-fulls">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Transfer Your Domain</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move your domain to Trust Host Pro and enjoy better pricing, enhanced security, and superior support
            </p>
          </div>

          {/* Transfer Form */}
          <Card className="max-w-2xl mx-auto mb-16">
            <CardHeader>
              <CardTitle className="text-center">Start Your Domain Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium mb-2">
                    Enter your domain name
                  </label>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                  Check Transfer Eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  We'll check if your domain is eligible for transfer and provide you with next steps
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Better Pricing</h3>
                <p className="text-gray-600">Save up to 30% on domain renewals compared to other registrars</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                <p className="text-gray-600">Advanced security features and domain lock protection included</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quick Process</h3>
                <p className="text-gray-600">Most transfers complete within 5-7 days with our streamlined process</p>
              </CardContent>
            </Card>
          </div>

          {/* Transfer Process */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How Domain Transfer Works</h2>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold mb-2">Unlock Domain</h3>
                <p className="text-sm text-gray-600">Unlock your domain at your current registrar</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold mb-2">Get Auth Code</h3>
                <p className="text-sm text-gray-600">Request the authorization code from your registrar</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold mb-2">Initiate Transfer</h3>
                <p className="text-sm text-gray-600">Start the transfer process with us using the auth code</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold mb-2">Complete Transfer</h3>
                <p className="text-sm text-gray-600">Confirm the transfer and enjoy our services</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Transfer Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Before You Start:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Domain must be at least 60 days old</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">No recent transfers (within 60 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Valid authorization code from current registrar</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Free 1-year extension upon transfer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Free domain privacy protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">Professional DNS management</span>
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
