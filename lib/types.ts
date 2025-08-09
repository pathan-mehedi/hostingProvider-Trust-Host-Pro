export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  user_type: "client" | "admin"
  created_at: string
  updated_at: string
}

export interface Domain {
  id: string
  user_id: string
  domain_name: string
  status: "active" | "expired" | "suspended" | "pending"
  registration_date: string
  expiry_date: string
  auto_renew: boolean
  nameservers: string[]
  dns_records: DNSRecord[]
  created_at: string
  updated_at: string
}

export interface DNSRecord {
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT"
  name: string
  value: string
  ttl?: number
}

export interface HostingPlan {
  id: string
  name: string
  description?: string
  price: number
  billing_cycle: "monthly" | "yearly"
  disk_space_gb: number
  bandwidth_gb?: number
  email_accounts: number
  databases: number
  features: string[]
  is_active: boolean
  created_at: string
}

export interface HostingService {
  id: string
  user_id: string
  hosting_plan_id: string
  domain_name?: string
  status: "active" | "suspended" | "cancelled" | "pending"
  start_date: string
  expiry_date: string
  disk_usage_gb: number
  bandwidth_usage_gb: number
  created_at: string
  updated_at: string
  hosting_plan?: HostingPlan
}

export interface Invoice {
  id: string
  user_id: string
  invoice_number: string
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
  due_date: string
  paid_date?: string
  description?: string
  line_items: InvoiceLineItem[]
  created_at: string
  updated_at: string
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface SupportTicket {
  id: string
  user_id: string
  ticket_number: string
  subject: string
  description: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  assigned_to?: string
  created_at: string
  updated_at: string
  user?: User
}

export interface DashboardStats {
  totalUsers: number
  activeDomains: number
  activeHosting: number
  monthlyRevenue: number
  openTickets: number
  recentSales: number
}
