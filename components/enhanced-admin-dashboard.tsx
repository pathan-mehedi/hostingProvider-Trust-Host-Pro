"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Globe, Server, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { DashboardStats, User, SupportTicket } from "@/lib/types"

export default function EnhancedAdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeDomains: 0,
    activeHosting: 0,
    monthlyRevenue: 0,
    openTickets: 0,
    recentSales: 0,
  })
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [recentTickets, setRecentTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.user_type === "admin") {
      fetchAdminData()
    }
  }, [user])

  const fetchAdminData = async () => {
    // Mock admin data - in production, fetch from API
    setStats({
      totalUsers: 1234,
      activeDomains: 876,
      activeHosting: 654,
      monthlyRevenue: 15230,
      openTickets: 23,
      recentSales: 45,
    })

    setRecentUsers([
      {
        id: "1",
        email: "ahmed.khan@example.com",
        full_name: "Ahmed Khan",
        phone: "+880 1712345678",
        user_type: "client",
        created_at: "2024-12-01T00:00:00Z",
        updated_at: "2024-12-01T00:00:00Z",
      },
      {
        id: "2",
        email: "fatima.begum@example.com",
        full_name: "Fatima Begum",
        phone: "+880 1798765432",
        user_type: "client",
        created_at: "2024-11-28T00:00:00Z",
        updated_at: "2024-11-28T00:00:00Z",
      },
    ])

    setRecentTickets([
      {
        id: "1",
        user_id: "1",
        ticket_number: "TKT-2024-001",
        subject: "Domain DNS Configuration",
        description: "Need help with DNS setup",
        status: "open",
        priority: "high",
        created_at: "2024-12-08T00:00:00Z",
        updated_at: "2024-12-08T00:00:00Z",
        user: {
          id: "1",
          email: "ahmed.khan@example.com",
          full_name: "Ahmed Khan",
          user_type: "client",
          created_at: "2024-12-01T00:00:00Z",
          updated_at: "2024-12-01T00:00:00Z",
        },
      },
      {
        id: "2",
        user_id: "2",
        ticket_number: "TKT-2024-002",
        subject: "Hosting Performance Issue",
        description: "Website loading slowly",
        status: "in_progress",
        priority: "medium",
        created_at: "2024-12-07T00:00:00Z",
        updated_at: "2024-12-07T00:00:00Z",
        user: {
          id: "2",
          email: "fatima.begum@example.com",
          full_name: "Fatima Begum",
          user_type: "client",
          created_at: "2024-11-28T00:00:00Z",
          updated_at: "2024-11-28T00:00:00Z",
        },
      },
    ])

    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      open: "destructive",
      in_progress: "secondary",
      resolved: "default",
      closed: "outline",
    }
    return <Badge variant={variants[status] || "outline"}>{status.replace("_", " ")}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      low: "outline",
      medium: "secondary",
      high: "destructive",
      urgent: "destructive",
    }
    return <Badge variant={variants[priority] || "outline"}>{priority}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading admin dashboard...</div>
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Add New User</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDomains.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hosting</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeHosting.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +10% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-orange-700">
                <strong>{stats.openTickets}</strong> open support tickets need attention
              </p>
              <p className="text-sm text-orange-700">
                <strong>12</strong> domains expiring in the next 7 days
              </p>
              <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="h-5 w-5" />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-green-700">
                <strong>{stats.recentSales}</strong> new sales this week
              </p>
              <p className="text-sm text-green-700">
                <strong>98.5%</strong> uptime across all services
              </p>
              <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.ticket_number}</p>
                        <p className="text-sm text-gray-500">{ticket.subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.user?.full_name}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Respond
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Tickets
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Revenue chart would go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
