import { type NextRequest, NextResponse } from "next/server"

// Enhanced mock domain availability check with better suggestions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 })
  }

  // Simulate API delay for realistic experience
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Popular TLDs with realistic pricing
  const tlds = [
    { ext: ".com", basePrice: 12.99, popularity: 0.8 },
    { ext: ".net", basePrice: 14.99, popularity: 0.6 },
    { ext: ".org", basePrice: 13.99, popularity: 0.5 },
    { ext: ".info", basePrice: 8.99, popularity: 0.3 },
    { ext: ".biz", basePrice: 9.99, popularity: 0.3 },
    { ext: ".co", basePrice: 24.99, popularity: 0.4 },
    { ext: ".io", basePrice: 39.99, popularity: 0.7 },
    { ext: ".app", basePrice: 18.99, popularity: 0.5 },
  ]

  const results = tlds.map((tld) => {
    const fullDomain = `${domain}${tld.ext}`
    // More realistic availability based on popularity
    const available = Math.random() > tld.popularity
    const isPremium = Math.random() > 0.8
    const price = isPremium ? tld.basePrice * 2 : tld.basePrice

    return {
      domain: fullDomain,
      available,
      price: Math.round(price * 100) / 100,
      premium: isPremium && available,
      suggested: false,
    }
  })

  // Add some suggested alternatives if main domain is taken
  const mainDomainTaken = !results.find((r) => r.domain === `${domain}.com`)?.available
  if (mainDomainTaken) {
    const suggestions = [`get${domain}.com`, `${domain}online.com`, `${domain}pro.com`, `my${domain}.com`]

    suggestions.forEach((suggestion) => {
      results.push({
        domain: suggestion,
        available: Math.random() > 0.3,
        price: 12.99,
        premium: false,
        suggested: true,
      })
    })
  }

  return NextResponse.json({ results })
}
