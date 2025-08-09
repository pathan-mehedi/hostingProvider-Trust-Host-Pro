"use client"

import type React from "react"

import { useState } from "react"
import { TwoLayerHeader } from "@/components/two-layer-header"
import { ModernFooter } from "@/components/modern-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Clock, MessageSquare, HeadphonesIcon } from "lucide-react"

export default function SupportContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <TwoLayerHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Our Support Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Need help? Our expert support team is here to assist you 24/7. Choose the method that works best for you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Live Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone Support</h3>
                      <p className="text-sm text-gray-600">24/7 Available</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Call us directly for immediate assistance</p>
                  <p className="font-mono text-lg font-semibold">+880 1XXXXXXXXX</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Support</h3>
                      <p className="text-sm text-gray-600">Response within 1 hour</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Send us a detailed message</p>
                  <p className="font-mono text-lg font-semibold">support@trusthostpro.com</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2">
                          Category
                        </label>
                        <Select onValueChange={(value) => handleChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing & Account</SelectItem>
                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                            <SelectItem value="domains">Domain Issues</SelectItem>
                            <SelectItem value="hosting">Hosting Problems</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Please provide detailed information about your request..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Hours */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-3 text-center">
                <div>
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Round-the-clock assistance whenever you need it</p>
                </div>
                <div>
                  <HeadphonesIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Expert Team</h3>
                  <p className="text-sm text-gray-600">Knowledgeable technicians with years of experience</p>
                </div>
                <div>
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-sm text-gray-600">Average response time under 15 minutes</p>
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
