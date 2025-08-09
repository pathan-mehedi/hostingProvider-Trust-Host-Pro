import type React from "react"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Trust Host Pro - Domain & Hosting Solutions",
  description: "Your trusted partner for domain registration and web hosting services in Bangladesh since 2015.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
