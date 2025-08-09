"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Globe, Server, Ticket, DollarSign, Calendar, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { Domain, HostingService, Invoice, SupportTicket } from "@/lib/types"

export default function EnhancedClientDashboard() {
  const { user } = useAuth()
  const [domains, setDomains] = useState<Domain[]>([])
  const [hostingServices, setHostingServices] = useState<HostingService[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    // In a real app, these would be separate API calls
    // For now, we'll use mock data
    setDomains([
      {
        id: "1",
        user_id: user!.id,
        domain_name: "example.com",
        status: "active",
        registration_date: "2024-01-15",
        expiry_date: "2025-01-15",
        auto_renew: true,
        nameservers: ["ns1.trusthostpro.com", "ns2.trusthostpro.com"],
        dns_records: [],
        created_at: "2024-01-15T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z",
      },
      {
        id: "2",
        user_id: user!.id,
        domain_name: "mybusiness.net",
        status: "active",
        registration_date: "2024-03-10",
        expiry_date: "2025-03-10",
        auto_renew: false,
        nameservers: ["ns1.trusthostpro.com", "ns2.trusthostpro.com"],
        dns_records: [],
        created_at: "2024-03-10T00:00:00Z",
        updated_at: "2024-03-10T00:00:00Z",
      },
    ])

    setHostingServices([
      {
        id: "1",
        user_id: user!.id,
        hosting_plan_id: "1",
        domain_name: "example.com",
        status: "active",
        start_date: "2024-01-15",
        expiry_date: "2025-01-15",
        disk_usage_gb: 3.2,
        bandwidth_usage_gb: 45.8,
        created_at: "2024-01-15T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z",
        hosting_plan: {
          id: "1",
          name: "Business Hosting",
          description: "Perfect for growing businesses",
          price: 12.99,
          billing_cycle: "monthly",
          disk_space_gb: 50,
          bandwidth_gb: 500,
          email_accounts: 25,
          databases: 5,
          features: ["Free SSL", "24/7 Support", "Daily Backups"],
          is_active: true,
          created_at: "2024-01-01T00:00:00Z",
        },
      },
    ])

    setInvoices([
      {
        id: "1",
        user_id: user!.id,
        invoice_number: "INV-2024-001",
        amount: 25.98,
        status: "pending",
        due_date: "2024-12-15",
        description: "Monthly hosting and domain renewal",
        line_items: [
          { description: "Business Hosting", quantity: 1, unit_price: 12.99, total: 12.99 },
          { description: "Domain Renewal - example.com", quantity: 1, unit_price: 12.99, total: 12.99 },
        ],
        created_at: "2024-11-15T00:00:00Z",
        updated_at: "2024-11-15T00:00:00Z",
      },
    ])

    setTickets([
      {
        id: "1",
        user_id: user!.id,
        ticket_number: "TKT-2024-001",
        subject: "DNS Configuration Help",
        description: "Need help setting up DNS records for my domain",
        status: "open",
        priority: "medium",
        created_at: "2024-12-01T00:00:00Z",
        updated_at: "2024-12-01T00:00:00Z",
      },
    ])

    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      pending: "secondary",
      expired: "destructive",
      suspended: "destructive",
      paid: "default",
      overdue: "destructive",
      open: "secondary",
      resolved: "default",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user?.full_name || "Client"}!</h1>
        <Button>Quick Actions</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.length}</div>
            <p className="text-xs text-muted-foreground">
              {domains.filter((d) => new Date(d.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}{" "}
              expiring soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Hosting</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hostingServices.length}</div>
            <p className="text-xs text-muted-foreground">All services running smoothly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.status === "open").length}</div>
            <p className="text-xs text-muted-foreground">
              {tickets.filter((t) => t.status === "open").length > 0 ? "Awaiting response" : "No open tickets"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {invoices
                .filter((i) => i.status === "pending")
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "pending").length} pending invoice(s)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Domain Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {domains.slice(0, 3).map((domain) => (
                <div key={domain.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{domain.domain_name}</p>
                    <p className="text-sm text-gray-500">
                      Expires: {new Date(domain.expiry_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(domain.status)}
                    {new Date(domain.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                View All Domains
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Hosting Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostingServices.map((service) => (
                <div key={service.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.domain_name}</span>
                    {getStatusBadge(service.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>
                        {service.disk_usage_gb}GB / {service.hosting_plan?.disk_space_gb}GB
                      </span>
                    </div>
                    <Progress
                      value={(service.disk_usage_gb / (service.hosting_plan?.disk_space_gb || 1)) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bandwidth</span>
                      <span>
                        {service.bandwidth_usage_gb}GB / {service.hosting_plan?.bandwidth_gb || "Unlimited"}
                      </span>
                    </div>
                    {service.hosting_plan?.bandwidth_gb && (
                      <Progress
                        value={(service.bandwidth_usage_gb / service.hosting_plan.bandwidth_gb) * 100}
                        className="h-2"
                      />
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Manage Hosting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Domain Renewal: example.com</span>
                  </div>
                </TableCell>
                <TableCell>2024-11-28</TableCell>
                <TableCell>{getStatusBadge("pending")}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Renew Now
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-green-500" />
                    <span>Hosting Plan Upgrade</span>
                  </div>
                </TableCell>
                <TableCell>2024-11-25</TableCell>
                <TableCell>{getStatusBadge("active")}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-orange-500" />
                    <span>Support Ticket: DNS Issue</span>
                  </div>
                </TableCell>
                <TableCell>2024-11-20</TableCell>
                <TableCell>{getStatusBadge("open")}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View Ticket
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Invoices */}
      {invoices.filter((i) => i.status === "pending").length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pending Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices
                .filter((i) => i.status === "pending")
                .map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50"
                  >
                    <div>
                      <p className="font-medium">{invoice.invoice_number}</p>
                      <p className="text-sm text-gray-600">{invoice.description}</p>
                      <p className="text-sm text-gray-500">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
                      <Button size="sm" className="mt-2">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
