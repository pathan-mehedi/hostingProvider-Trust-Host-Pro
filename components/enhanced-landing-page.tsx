"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  Server,
  Shield,
  ArrowRight,
  Database,
  Headphones,
  MessageSquare,
  Clock,
  Send,
  Users,
  Zap,
  Award,
  TrendingUp,
  Lock,
} from "lucide-react"

import { TwoLayerHeader } from "./two-layer-header"
import { ModernFooter } from "./modern-footer"
import { RealTimeDomainSearch } from "./real-time-domain-search"
import { ModernPricingCards } from "./modern-pricing-cards"

interface DomainResult {
  domain: string
  available: boolean
  price: number
}

export default function EnhancedLandingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleDomainSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/domains/search?domain=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
  }

  const services = [
    {
      icon: Globe,
      title: "Domain Registration",
      description: "Secure your perfect domain name with instant registration and comprehensive management tools.",
      features: ["500+ TLD Extensions", "Free WHOIS Privacy", "DNS Management", "Auto-Renewal Options"],
      price: "Starting at $12.99/year",
      color: "blue",
      popular: true,
      href: "/domains/search",
    },
    {
      icon: Server,
      title: "Web Hosting",
      description: "Lightning-fast hosting powered by SSD storage and optimized for maximum performance.",
      features: ["99.9% Uptime SLA", "Free SSL Certificate", "Daily Backups", "24/7 Support"],
      price: "Starting at $5.99/month",
      color: "green",
      popular: false,
      href: "/hosting/shared",
    },
    {
      icon: Database,
      title: "VPS Hosting",
      description: "Scalable virtual private servers with full root access and dedicated resources.",
      features: ["Full Root Access", "SSD Storage", "Multiple OS Options", "Scalable Resources"],
      price: "Starting at $29.99/month",
      color: "purple",
      popular: false,
      href: "/servers/vps",
    },
    {
      icon: Shield,
      title: "SSL Certificates",
      description: "Secure your website and build customer trust with industry-standard SSL encryption.",
      features: ["256-bit Encryption", "Browser Trust", "Warranty Protection", "Easy Installation"],
      price: "Starting at $9.99/year",
      color: "orange",
      popular: false,
      href: "/security/ssl",
    },
    {
      icon: Mail,
      title: "Business Email",
      description: "Professional email hosting with your domain name and advanced collaboration tools.",
      features: ["Custom Domain Email", "25GB Storage", "Mobile Sync", "Spam Protection"],
      price: "Starting at $4.99/month",
      color: "indigo",
      popular: false,
      href: "/email/business",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert technical support available around the clock via chat, phone, and email.",
      features: ["Live Chat Support", "Phone Support", "Email Tickets", "Knowledge Base"],
      price: "Always Free",
      color: "pink",
      popular: false,
      href: "/support/contact",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "SSD storage and optimized servers ensure your website loads in milliseconds.",
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "Advanced security measures and free SSL certificates keep your data safe.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in hosting services and customer satisfaction.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical support from certified professionals who care about your success.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Headphones },
    { number: "9+", label: "Years Experience", icon: Award },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-600",
        iconBg: "bg-blue-100",
        button: "bg-blue-600 hover:bg-blue-700",
        badge: "bg-blue-100 text-blue-800",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-600",
        iconBg: "bg-green-100",
        button: "bg-green-600 hover:bg-green-700",
        badge: "bg-green-100 text-green-800",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "text-purple-600",
        iconBg: "bg-purple-100",
        button: "bg-purple-600 hover:bg-purple-700",
        badge: "bg-purple-100 text-purple-800",
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: "text-orange-600",
        iconBg: "bg-orange-100",
        button: "bg-orange-600 hover:bg-orange-700",
        badge: "bg-orange-100 text-orange-800",
      },
      indigo: {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        icon: "text-indigo-600",
        iconBg: "bg-indigo-100",
        button: "bg-indigo-600 hover:bg-indigo-700",
        badge: "bg-indigo-100 text-indigo-800",
      },
      pink: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        icon: "text-pink-600",
        iconBg: "bg-pink-100",
        button: "bg-pink-600 hover:bg-pink-700",
        badge: "bg-pink-100 text-pink-800",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full">
      <TwoLayerHeader />

      <main className="flex-1">
        {/* Hero Section with Domain Search */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl translate-y-48 -translate-x-48" />

          <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center relative">
            <div className="space-y-6">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2">
                🚀 Trusted by 10,000+ customers worldwide
              </Badge>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Your Trusted Partner for
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Domains & Hosting
                </span>
              </h1>

              <p className="mx-auto max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Secure your online presence with Trust Host Pro. Fast, reliable, and affordable domain registration and
                web hosting services since 2015. Join thousands of satisfied customers who trust us with their digital
                success.
              </p>
            </div>

            <div className="mx-auto w-full max-w-2xl space-y-4 mt-8">
              <RealTimeDomainSearch />
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <Lock className="h-3 w-3" />
                Secure registration • Instant activation • 24/7 support
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Built for Performance & Reliability
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                We combine cutting-edge technology with exceptional service to deliver hosting solutions that grow with
                your business.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Everything You Need to Succeed Online
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                From domain registration to enterprise hosting solutions, we provide comprehensive services to power
                your digital presence with reliability and performance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const IconComponent = service.icon
                const colorClasses = getColorClasses(service.color)

                return (
                  <Card
                    key={service.title}
                    className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      service.popular ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div
                          className={`inline-flex p-4 rounded-2xl ${colorClasses.iconBg} mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className={`h-8 w-8 ${colorClasses.icon}`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>

                      <div className="mb-6">
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">{service.price}</span>
                          {service.popular && <Badge className={colorClasses.badge}>Popular Choice</Badge>}
                        </div>

                        <Button
                          className={`w-full ${colorClasses.button} group-hover:shadow-lg transition-all duration-300`}
                          asChild
                        >
                          <Link href={service.href}>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Pricing Plans</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Affordable Pricing Plans</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan that fits your budget and requirements. All plans include our core features.
                </p>
              </div>
            </div>
            <ModernPricingCards />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">About Us</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Thousands Since 2015
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Trust Host Pro has been a leading provider of domain registration and web hosting services in
                  Bangladesh. We are committed to providing reliable, high-performance, and affordable solutions to help
                  individuals and businesses succeed online.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">9+ Years Experience</h4>
                      <p className="text-sm text-gray-600">Operating successfully since 2015</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer First</h4>
                      <p className="text-sm text-gray-600">Dedicated to excellent support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Latest Technology</h4>
                      <p className="text-sm text-gray-600">Cutting-edge infrastructure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                      <p className="text-sm text-gray-600">Always here when you need us</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/support/contact">Contact Our Team</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                <Image
                  src="/trust-pro-team-trust.png?height=500&width=600&text=Trust+Host+Pro+Team+at+Work"
                  width="600"
                  height="500"
                  alt="Trust Host Pro Team"
                  className="relative rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">What Our Clients Say</h2>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                Don't just take our word for it. Here's what our satisfied customers have to say about their experience
                with Trust Host Pro.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  name: "Ahmed Khan",
                  role: "Small Business Owner",
                  avatar: "AK",
                  rating: 5,
                  text: "Trust Host Pro has been instrumental in getting my business online. Their support is top-notch and their hosting is incredibly reliable! I've never experienced any downtime.",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  name: "Fatima Begum",
                  role: "Entrepreneur",
                  avatar: "FB",
                  rating: 5,
                  text: "I've been with Trust Host Pro since 2018, and I couldn't be happier. Their domain management tools are so easy to use, and the pricing is very competitive.",
                  color: "bg-green-100 text-green-600",
                },
                {
                  name: "Omar Faruk",
                  role: "Blogger",
                  avatar: "OF",
                  rating: 5,
                  text: "Excellent service and competitive pricing. Trust Host Pro made it simple to launch my personal blog. The customer support team is always helpful and responsive.",
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</blockquote>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${testimonial.color}`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50"
        >
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Contact Us</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Get in Touch</h2>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                Ready to get started? Have questions? Our team is here to help you succeed online.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16" />
                <CardContent className="p-8 relative">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="Enter your email address"
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your project or ask any questions..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Methods */}
                <div className="grid gap-4">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">Live Chat</h4>
                          <p className="text-sm text-gray-600 mb-2">Get instant help from our support team</p>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                          <p className="text-sm text-gray-600 mb-1">+880 1XXXXXXXXX</p>
                          <p className="text-xs text-gray-500">Available 24/7</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                          <p className="text-sm text-gray-600 mb-1">info@trusthostpro.com</p>
                          <p className="text-xs text-gray-500">Response within 1 hour</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Card */}
                <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Why Customers Choose Us
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">10K+</div>
                        <div className="text-xs text-gray-300">Happy Customers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">99.9%</div>
                        <div className="text-xs text-gray-300">Uptime SLA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">24/7</div>
                        <div className="text-xs text-gray-300">Support</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">9+ Years</div>
                        <div className="text-xs text-gray-300">Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Info */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Visit Our Office</h4>
                        <p className="text-sm text-gray-600 mb-1">123 Main Street</p>
                        <p className="text-sm text-gray-600 mb-2">Dhaka 1000, Bangladesh</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Mon-Fri: 9 AM - 6 PM</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  )
}
