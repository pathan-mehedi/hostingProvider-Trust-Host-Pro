"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Search,
  Plus,
  Settings,
  Calendar,
  Shield,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
} from "lucide-react"

export default function DomainsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const domains = [
    {
      id: "1",
      name: "example.com",
      status: "active",
      registrationDate: "2024-01-15",
      expiryDate: "2025-01-15",
      autoRenew: true,
      daysUntilExpiry: 45,
      registrar: "Trust Host Pro",
      nameservers: ["ns1.trusthostpro.com", "ns2.trusthostpro.com"],
    },
    {
      id: "2",
      name: "mysite.org",
      status: "active",
      registrationDate: "2024-03-10",
      expiryDate: "2025-03-10",
      autoRenew: false,
      daysUntilExpiry: 99,
      registrar: "Trust Host Pro",
      nameservers: ["ns1.trusthostpro.com", "ns2.trusthostpro.com"],
    },
    {
      id: "3",
      name: "business.net",
      status: "expiring_soon",
      registrationDate: "2023-12-01",
      expiryDate: "2024-12-01",
      autoRenew: false,
      daysUntilExpiry: 7,
      registrar: "Trust Host Pro",
      nameservers: ["ns1.trusthostpro.com", "ns2.trusthostpro.com"],
    },
  ]

  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    if (status === "expiring_soon" || daysUntilExpiry <= 30) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Expiring Soon
        </Badge>
      )
    }
    if (status === "active") {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      )
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  const filteredDomains = domains.filter((domain) => domain.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Domain Management</h1>
          <p className="text-gray-600">Manage your domains, DNS settings, and renewals</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Register New Domain
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Domains</p>
                <p className="text-2xl font-bold text-gray-900">{domains.length}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Domains</p>
                <p className="text-2xl font-bold text-gray-900">
                  {domains.filter((d) => d.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {domains.filter((d) => d.daysUntilExpiry <= 30).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Auto-Renewal</p>
                <p className="text-2xl font-bold text-gray-900">{domains.filter((d) => d.autoRenew).length}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domains Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Domains</CardTitle>
          <CardDescription>Manage your domain portfolio and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Domains ({domains.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({domains.filter((d) => d.status === "active").length})</TabsTrigger>
              <TabsTrigger value="expiring">
                Expiring Soon ({domains.filter((d) => d.daysUntilExpiry <= 30).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Auto-Renew</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains.map((domain) => (
                      <TableRow key={domain.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{domain.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(domain.status, domain.daysUntilExpiry)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(domain.registrationDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{new Date(domain.expiryDate).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-500">({domain.daysUntilExpiry} days)</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={domain.autoRenew ? "default" : "secondary"}>
                            {domain.autoRenew ? "Enabled" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDomains
                      .filter((d) => d.status === "active")
                      .map((domain) => (
                        <TableRow key={domain.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{domain.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(domain.status, domain.daysUntilExpiry)}</TableCell>
                          <TableCell>{new Date(domain.expiryDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expiring">
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Domains Expiring Soon</h3>
                  </div>
                  <p className="text-sm text-orange-700">
                    The following domains will expire within 30 days. Renew them now to avoid service interruption.
                  </p>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Domain Name</TableHead>
                        <TableHead>Days Until Expiry</TableHead>
                        <TableHead>Auto-Renew</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDomains
                        .filter((d) => d.daysUntilExpiry <= 30)
                        .map((domain) => (
                          <TableRow key={domain.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-orange-600" />
                                <span className="font-medium">{domain.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="destructive">{domain.daysUntilExpiry} days</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={domain.autoRenew ? "default" : "secondary"}>
                                {domain.autoRenew ? "Enabled" : "Disabled"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                  <Zap className="h-4 w-4 mr-1" />
                                  Renew Now
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Register New Domain</h3>
                <p className="text-sm text-gray-600">Find and register your perfect domain</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Domain Protection</h3>
                <p className="text-sm text-gray-600">Add privacy protection to your domains</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <RefreshCw className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Bulk Operations</h3>
                <p className="text-sm text-gray-600">Manage multiple domains at once</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
