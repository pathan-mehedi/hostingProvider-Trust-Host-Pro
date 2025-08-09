"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Globe,
  Server,
  User,
  Settings,
  Users,
  LayoutDashboard,
  DollarSign,
  FileText,
  History,
  LifeBuoy,
  ChevronUp,
  ChevronDown,
  Search,
  Package2,
  LogOut,
  Bell,
  HelpCircle,
  Shield,
  Ticket,
  CreditCard,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarInput,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const isAdmin = user?.user_type === "admin"

  const clientNavItems = [
    {
      title: "Overview",
      url: "/dashboard/client",
      icon: Home,
      badge: null,
    },
    {
      title: "Domains",
      url: "/dashboard/client/domains",
      icon: Globe,
      badge: "3",
    },
    {
      title: "Hosting",
      url: "/dashboard/client/hosting",
      icon: Server,
      badge: null,
    },
    {
      title: "Billing",
      url: "/dashboard/client/billing",
      icon: CreditCard,
      badge: "1",
    },
    {
      title: "Support",
      url: "/dashboard/client/support",
      icon: LifeBuoy,
      badge: null,
    },
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
      badge: "1.2K",
    },
    {
      title: "Domains",
      url: "/dashboard/admin/domains",
      icon: Globe,
      badge: "876",
    },
    {
      title: "Hosting",
      url: "/dashboard/admin/hosting",
      icon: Server,
      badge: null,
    },
    {
      title: "Billing & Reports",
      url: "/dashboard/admin/billing",
      icon: DollarSign,
      badge: null,
    },
    {
      title: "Support Tickets",
      url: "/dashboard/admin/support",
      icon: Ticket,
      badge: "23",
    },
    {
      title: "Content Management",
      url: "/dashboard/admin/content",
      icon: FileText,
      badge: null,
    },
  ]

  const quickLinks = [
    {
      title: "Order History",
      url: "/dashboard/client/history",
      icon: History,
    },
    {
      title: "Account Settings",
      url: "/dashboard/client/settings",
      icon: Settings,
    },
    {
      title: "Security",
      url: "/dashboard/client/security",
      icon: Shield,
    },
  ]

  const currentNavItems = isAdmin ? adminNavItems : clientNavItems

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sidebar-primary-foreground">
            <Package2 className="size-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Trust Host Pro</span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              {isAdmin ? "Admin Panel" : "Client Portal"}
            </span>
          </div>
        </div>

        {/* Search - only show when expanded */}
        <div className="group-data-[collapsible=icon]:hidden px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/50" />
            <SidebarInput placeholder="Search..." className="pl-8 h-8" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70 px-2 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="group relative"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-5 px-1.5 text-xs bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Links - Collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="group/label w-full text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground px-2 py-2 rounded-md transition-colors">
                <span>Quick Links</span>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {quickLinks.map((link) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton asChild tooltip={link.title}>
                        <Link href={link.url} className="flex items-center gap-3">
                          <link.icon className="h-4 w-4" />
                          <span>{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarSeparator />

        {/* Notifications - only for expanded state */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70 px-2 py-2">
            Notifications
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                <Bell className="h-4 w-4 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-blue-900">Domain Renewal</p>
                  <p className="text-xs text-blue-700">example.com expires in 7 days</p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-orange-50 border border-orange-200">
                  <Ticket className="h-4 w-4 text-orange-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-orange-900">New Tickets</p>
                    <p className="text-xs text-orange-700">5 tickets need attention</p>
                  </div>
                </div>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <User className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.full_name || user?.email || "User"}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {user?.user_type === "admin" ? "Administrator" : "Client"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/client/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/client/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support/contact" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
