"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Globe, Server, CreditCard, TrendingUp, Shield, ArrowRight, Plus, Activity } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ClientDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Active Domains",
      value: "3",
      change: "+1 this month",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Hosting Plans",
      value: "2",
      change: "All active",
      icon: Server,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Monthly Spend",
      value: "$49.99",
      change: "-$10 saved",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "Last 30 days",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivity = [
    { action: "Domain renewed", item: "example.com", time: "2 hours ago", status: "success" },
    { action: "SSL certificate installed", item: "mysite.com", time: "1 day ago", status: "success" },
    { action: "Backup completed", item: "All sites", time: "2 days ago", status: "success" },
    { action: "Payment processed", item: "$29.99", time: "3 days ago", status: "success" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.full_name || user?.email}! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your hosting services today.</p>
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Your Services
              </CardTitle>
              <CardDescription>Manage your domains and hosting plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">example.com</h3>
                      <p className="text-sm text-gray-500">Shared Hosting</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Active
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span>2.1 GB / 10 GB</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">mysite.com</h3>
                      <p className="text-sm text-gray-500">WordPress Hosting</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Active
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span>5.7 GB / 25 GB</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add New Service
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Globe className="mr-2 h-4 w-4" />
                Register Domain
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Server className="mr-2 h-4 w-4" />
                Upgrade Hosting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="mr-2 h-4 w-4" />
                SSL Certificate
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                View Billing
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.item}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Our support team is here to help you 24/7</p>
              <Button className="w-full">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
