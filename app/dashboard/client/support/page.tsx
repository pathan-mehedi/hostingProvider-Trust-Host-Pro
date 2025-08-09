"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Plus,
  Search,
  Phone,
  Mail,
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
  Book,
  Video,
  ExternalLink,
} from "lucide-react"

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    priority: "",
    category: "",
    description: "",
  })

  const tickets = [
    {
      id: "TKT-2024-001",
      subject: "DNS Configuration Help",
      category: "Technical",
      priority: "medium",
      status: "open",
      created: "2024-12-01T10:00:00Z",
      updated: "2024-12-02T14:30:00Z",
      responses: 3,
    },
    {
      id: "TKT-2024-002",
      subject: "Billing Question",
      category: "Billing",
      priority: "low",
      status: "resolved",
      created: "2024-11-28T09:15:00Z",
      updated: "2024-11-29T11:20:00Z",
      responses: 2,
    },
    {
      id: "TKT-2024-003",
      subject: "Email Setup Issue",
      category: "Technical",
      priority: "high",
      status: "in_progress",
      created: "2024-12-03T16:45:00Z",
      updated: "2024-12-04T08:10:00Z",
      responses: 5,
    },
  ]

  const knowledgeBase = [
    {
      title: "How to set up DNS records",
      category: "Domains",
      views: 1250,
      helpful: 95,
    },
    {
      title: "Installing SSL certificates",
      category: "Security",
      views: 890,
      helpful: 88,
    },
    {
      title: "Email configuration guide",
      category: "Email",
      views: 756,
      helpful: 92,
    },
    {
      title: "WordPress installation tutorial",
      category: "Hosting",
      views: 2100,
      helpful: 97,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            Open
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New ticket:", newTicket)
    // Reset form
    setNewTicket({ subject: "", priority: "", category: "", description: "" })
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">Get help with your hosting services and account</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Create New Ticket
        </Button>
      </div>

      {/* Quick Contact Options */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">Call us for immediate assistance</p>
            <Button variant="outline" className="w-full bg-transparent">
              +880 1XXXXXXXXX
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Send us an email for detailed help</p>
            <Button variant="outline" className="w-full bg-transparent">
              info@trusthostpro.com
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Track and manage your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{ticket.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-gray-500">{ticket.responses} responses</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{new Date(ticket.updated).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll help you resolve it quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="domains">Domain Management</SelectItem>
                        <SelectItem value="hosting">Hosting Issues</SelectItem>
                        <SelectItem value="email">Email Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Please provide detailed information about your issue..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Find answers to common questions and learn how to use our services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {knowledgeBase.map((article, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Book className="h-4 w-4 text-blue-600" />
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{article.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{article.views} views</span>
                            <span>{article.helpful}% helpful</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>Step-by-step video guides for common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Setting up your first website</p>
                    <p className="text-sm text-gray-500">15 minutes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Watch
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Domain DNS configuration</p>
                    <p className="text-sm text-gray-500">8 minutes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Watch
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Email setup and management</p>
                    <p className="text-sm text-gray-500">12 minutes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Quick Help
                </CardTitle>
                <CardDescription>Common questions and quick solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">How do I change my password?</p>
                  <p className="text-sm text-gray-600">Go to Account Settings → Security → Change Password</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">How to add a subdomain?</p>
                  <p className="text-sm text-gray-600">Use the DNS management tool in your domain settings</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">Where can I download backups?</p>
                  <p className="text-sm text-gray-600">Hosting → Your Service → Backups tab</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
