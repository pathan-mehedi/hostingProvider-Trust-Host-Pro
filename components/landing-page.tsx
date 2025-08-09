import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Mail, Phone, MapPin, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-[100%]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-lg">
          <Globe className="h-6 w-6" />
          <span>Trust Host Pro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4">
            Services
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
            About Us
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="/dashboard/client" className="text-sm font-medium hover:underline underline-offset-4">
            Client Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Your Trusted Partner for Domains & Hosting
              </h1>
              <p className="mx-auto max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Secure your online presence with Trust Host Pro. Fast, reliable, and affordable domain registration and
                web hosting services since 2015.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-2 mt-8">
              <form className="flex gap-2">
                <Input type="text" placeholder="Search your perfect domain..." className="max-w-lg flex-1" />
                <Button type="submit">Search Domain</Button>
              </form>
              <p className="text-xs text-gray-500">Start building your online presence today.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive suite of services to get your website online and thriving.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Domain Registration</h3>
                <p className="text-gray-500">
                  Register your desired domain name quickly and easily. We support all major TLDs.
                </p>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Instant Registration
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    DNS Management
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Privacy Protection
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Web Hosting</h3>
                <p className="text-gray-500">Reliable and high-performance web hosting solutions for all your needs.</p>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    SSD Storage
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Unlimited Bandwidth
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    24/7 Expert Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Affordable Pricing Plans</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan that fits your budget and requirements.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Starter Hosting</CardTitle>
                  <p className="text-gray-500">Ideal for personal websites and blogs.</p>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    $5.99<span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />1 Website
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      10 GB SSD Storage
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited Bandwidth
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Free SSL Certificate
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col justify-between h-full border-2 border-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Business Hosting</CardTitle>
                  <p className="text-gray-500">Perfect for growing businesses and e-commerce.</p>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    $12.99<span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited Websites
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      50 GB SSD Storage
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited Bandwidth
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Free SSL Certificate
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Daily Backups
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Pro Hosting</CardTitle>
                  <p className="text-gray-500">For high-traffic sites and demanding applications.</p>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-4">
                    $24.99<span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited Websites
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      100 GB SSD Storage
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited Bandwidth
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Free SSL Certificate
                    </li>
                    <li>
                      <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Priority Support
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Trust Host Pro</h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Established in 2015, Trust Host Pro has been a leading provider of domain registration and web
                    hosting services in Bangladesh. We are committed to providing reliable, high-performance, and
                    affordable solutions to help individuals and businesses succeed online.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Years of Experience: Operating successfully since 2015.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Customer Satisfaction: Dedicated to excellent support.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Cutting-Edge Technology: Utilizing the latest infrastructure.
                  </li>
                </ul>
              </div>
              <Image
                src="/team-collaboration-computers.png"
                width="550"
                height="310"
                alt="About Us"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers about their experience with Trust Host Pro.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "Trust Host Pro has been instrumental in getting my business online. Their support is top-notch and
                    their hosting is incredibly reliable!"
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">- Ahmed Khan, Small Business Owner</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "I've been with Trust Host Pro since 2018, and I couldn't be happier. Their domain management tools
                    are so easy to use."
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">- Fatima Begum, Entrepreneur</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "Excellent service and competitive pricing. Trust Host Pro made it simple to launch my personal
                    blog. Highly recommended!"
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">- Omar Faruk, Blogger</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? We're here to help. Reach out to us through any of the following channels.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-start gap-6 py-12 sm:grid-cols-2 lg:gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <Mail className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Email Us</h3>
                <p className="text-gray-600">info@trusthostpro.com</p>
                <p className="text-gray-500 text-sm">We typically respond within 24 hours.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Phone className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-gray-600">+880 1XXXXXXXXX</p>
                <p className="text-gray-500 text-sm">Available during business hours.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:col-span-2">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Visit Us</h3>
                <p className="text-gray-600">123 Main Street, Dhaka, Bangladesh</p>
                <p className="text-gray-500 text-sm">By appointment only.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Trust Host Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
