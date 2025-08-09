"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  HardDrive,
  Wifi,
  Database,
  Shield,
  Zap,
  BarChart,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Monitor,
  Globe,
  Mail,
} from "lucide-react"

export default function HostingPage() {
  const [selectedPlan, setSelectedPlan] = useState("business")

  const hostingServices = [
    {
      id: "1",
      domain: "example.com",
      plan: "Business Hosting",
      status: "active",
      diskUsage: 3.2,
      diskLimit: 50,
      bandwidthUsage: 45.8,
      bandwidthLimit: 500,
      uptime: 99.9,
      lastBackup: "2024-12-08T02:00:00Z",
      phpVersion: "8.2",
      sslStatus: "active",
      emailAccounts: 5,
      databases: 2,
    },
    {
      id: "2",
      domain: "mysite.org",
      plan: "WordPress Hosting",
      status: "active",
      diskUsage: 8.7,
      diskLimit: 25,
      bandwidthUsage: 120.3,
      bandwidthLimit: 250,
      uptime: 99.8,
      lastBackup: "2024-12-08T02:00:00Z",
      phpVersion: "8.1",
      sslStatus: "active",
      emailAccounts: 3,
      databases: 1,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-orange-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hosting Management</h1>
          <p className="text-gray-600">Monitor and manage your hosting services</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          <Server className="mr-2 h-4 w-4" />
          Upgrade Hosting
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">{hostingServices.length}</p>
              </div>
              <Server className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Uptime</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(hostingServices.reduce((acc, service) => acc + service.uptime, 0) / hostingServices.length).toFixed(
                    1,
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">
                  {hostingServices.reduce((acc, service) => acc + service.diskUsage, 0).toFixed(1)} GB
                </p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SSL Certificates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {hostingServices.filter((s) => s.sslStatus === "active").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hosting Services */}
      <div className="space-y-6">
        {hostingServices.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.domain}</CardTitle>
                    <CardDescription className="text-base">{service.plan}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(service.status)}
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Uptime</p>
                            <p className="text-lg font-bold text-green-600">{service.uptime}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Database className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">PHP Version</p>
                            <p className="text-lg font-bold">{service.phpVersion}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="text-sm font-medium">SSL Status</p>
                            <p className="text-lg font-bold text-green-600">Active</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Email Accounts</span>
                          <span className="text-sm text-gray-500">{service.emailAccounts} / 25</span>
                        </div>
                        <Progress value={(service.emailAccounts / 25) * 100} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Databases</span>
                          <span className="text-sm text-gray-500">{service.databases} / 5</span>
                        </div>
                        <Progress value={(service.databases / 5) * 100} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HardDrive className="h-5 w-5" />
                          Disk Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Used: {service.diskUsage} GB</span>
                            <span>Limit: {service.diskLimit} GB</span>
                          </div>
                          <Progress value={(service.diskUsage / service.diskLimit) * 100} className="h-3" />
                          <p className="text-xs text-gray-500">
                            {((service.diskUsage / service.diskLimit) * 100).toFixed(1)}% used
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wifi className="h-5 w-5" />
                          Bandwidth Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Used: {service.bandwidthUsage} GB</span>
                            <span>Limit: {service.bandwidthLimit} GB</span>
                          </div>
                          <Progress value={(service.bandwidthUsage / service.bandwidthLimit) * 100} className="h-3" />
                          <p className="text-xs text-gray-500">
                            {((service.bandwidthUsage / service.bandwidthLimit) * 100).toFixed(1)}% used
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Usage Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500">Usage chart would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          SSL Certificate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Status</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Type</span>
                            <span className="text-sm font-medium">Let's Encrypt</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Auto-Renewal</span>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Enabled</Badge>
                          </div>
                          <Button variant="outline" className="w-full bg-transparent">
                            View Certificate Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-blue-600" />
                          Backups
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Last Backup</span>
                            <span className="text-sm font-medium">
                              {new Date(service.lastBackup).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Frequency</span>
                            <span className="text-sm font-medium">Daily</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Retention</span>
                            <span className="text-sm font-medium">30 days</span>
                          </div>
                          <Button variant="outline" className="w-full bg-transparent">
                            Download Backup
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Database className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Database Management</h3>
                        <p className="text-sm text-gray-600 mb-4">Create and manage MySQL databases</p>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Email Accounts</h3>
                        <p className="text-sm text-gray-600 mb-4">Manage email accounts and settings</p>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Monitor className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">File Manager</h3>
                        <p className="text-sm text-gray-600 mb-4">Upload and manage your website files</p>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common hosting management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Upgrade Plan</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Database className="h-5 w-5" />
              <span className="text-sm">Create Database</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Mail className="h-5 w-5" />
              <span className="text-sm">Add Email</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Security Scan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
