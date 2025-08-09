"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, CheckCircle, XCircle, ShoppingCart } from "lucide-react"
import { debounce } from "lodash"

interface DomainResult {
  domain: string
  available: boolean
  price: number
  premium?: boolean
  suggested?: boolean
}

export function RealTimeDomainSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setSearchResults([])
        setHasSearched(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/domains/search?domain=${encodeURIComponent(term)}`)
        const data = await response.json()
        setSearchResults(data.results || [])
        setHasSearched(true)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 500),
    [],
  )

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchTerm, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
    setSearchTerm(value)
  }

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      debouncedSearch.cancel()
      debouncedSearch(searchTerm)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Form */}
      <form onSubmit={handleManualSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Enter your domain name (e.g., mybusiness)"
            className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-blue-500" />
          )}
        </div>
        <Button type="submit" size="lg" className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700">
          Search
        </Button>
      </form>

      {/* Search Results */}
      {hasSearched && (
        <Card className="border-2 border-gray-100 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Domain Search Results
              {searchTerm && <span className="text-blue-600">for "{searchTerm}"</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <div className="grid gap-3">
                {searchResults.map((result) => (
                  <div
                    key={result.domain}
                    className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all hover:shadow-md ${
                      result.available
                        ? "border-green-200 bg-green-50 hover:border-green-300"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {result.available ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="font-semibold text-lg">{result.domain}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={result.available ? "default" : "secondary"} className="text-xs">
                          {result.available ? "Available" : "Taken"}
                        </Badge>
                        {result.premium && (
                          <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-600">
                            Premium
                          </Badge>
                        )}
                        {result.suggested && (
                          <Badge variant="outline" className="text-xs border-blue-400 text-blue-600">
                            Suggested
                          </Badge>
                        )}
                      </div>
                    </div>

                    {result.available && (
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${result.price}</div>
                          <div className="text-sm text-gray-500">/year</div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isSearching ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Searching for available domains...</span>
                  </div>
                ) : (
                  <div>
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No results found. Try a different domain name.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      {!hasSearched && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Domain Search Tips:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep it short and memorable (2-15 characters)</li>
              <li>• Use only letters, numbers, and hyphens</li>
              <li>• Avoid trademark conflicts</li>
              <li>• Consider multiple extensions (.com, .net, .org)</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
