"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/auth/login")
        return
      }

      // Redirect admin users to admin dashboard if they're on client dashboard
      if (user.user_type === "admin" && pathname === "/dashboard/client") {
        router.push("/dashboard/admin")
      }

      // Redirect client users trying to access admin dashboard
      if (user.user_type === "client" && pathname.startsWith("/dashboard/admin")) {
        router.push("/dashboard/client")
      }
    }
  }, [user, loading, pathname, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Please wait while we prepare your account...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if user is not authenticated
  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white/80 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold ml-4">
            {user.user_type === "admin" ? "Admin Dashboard" : "Client Dashboard"}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Welcome, {user.full_name || user.email}</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-50/50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
