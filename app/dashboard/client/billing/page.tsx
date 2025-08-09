"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Download,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Receipt,
  TrendingUp,
  Eye,
} from "lucide-react"

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-11-15",
      dueDate: "2024-12-15",
      amount: 25.98,
      status: "pending",
      description: "Monthly hosting and domain renewal",
      items: [
        { description: "Business Hosting - example.com", amount: 12.99 },
        { description: "Domain Renewal - example.com", amount: 12.99 },
      ],
    },
    {
      id: "INV-2024-002",
      date: "2024-10-15",
      dueDate: "2024-11-15",
      amount: 12.99,
      status: "paid",
      description: "Monthly hosting fee",
      items: [{ description: "Business Hosting - mysite.org", amount: 12.99 }],
    },
    {
      id: "INV-2024-003",
      date: "2024-09-15",
      dueDate: "2024-10-15",
      amount: 29.99,
      status: "paid",
      description: "VPS hosting upgrade",
      items: [{ description: "VPS Standard Plan", amount: 29.99 }],
    },
  ]

  const paymentMethods = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalPending = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0)

  const totalPaid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600">Manage your invoices, payments, and billing information</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          <CreditCard className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      {/* Billing Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-orange-600">${totalPending.toFixed(2)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid (2024)</p>
                <p className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Payment</p>
                <p className="text-2xl font-bold text-gray-900">Dec 15</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Avg</p>
                <p className="text-2xl font-bold text-gray-900">${(totalPaid / 3).toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Invoices Alert */}
      {totalPending > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">Payment Required</h3>
                <p className="text-sm text-orange-700 mb-3">
                  You have ${totalPending.toFixed(2)} in pending invoices. Pay now to avoid service interruption.
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Pay Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Filter by Date
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Invoices</CardTitle>
              <CardDescription>View and manage your billing invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{invoice.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.description}</p>
                            <p className="text-sm text-gray-500">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            {invoice.status === "pending" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Pay
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className={`${method.isDefault ? "ring-2 ring-blue-500" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Default</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full h-16 border-dashed bg-transparent">
                <CreditCard className="mr-2 h-5 w-5" />
                Add New Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your complete payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices
                  .filter((inv) => inv.status === "paid")
                  .map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-gray-500">Paid on {new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
