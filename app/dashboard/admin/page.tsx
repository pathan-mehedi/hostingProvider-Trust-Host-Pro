"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Globe, Server, DollarSign } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.user_type !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  if (!user || user.user_type !== "admin") {
    return null
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Admin Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">876</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hosting</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">654</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Last 30 Days)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,230</div>
            <p className="text-xs text-muted-foreground">+10% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#TKT001</TableCell>
                <TableCell>Domain DNS Issue</TableCell>
                <TableCell>Ahmed Khan</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>2025-08-08</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#TKT002</TableCell>
                <TableCell>Hosting Upgrade Request</TableCell>
                <TableCell>Fatima Begum</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>2025-08-07</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#TKT003</TableCell>
                <TableCell>Billing Inquiry</TableCell>
                <TableCell>Omar Faruk</TableCell>
                <TableCell>Closed</TableCell>
                <TableCell>2025-08-05</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
