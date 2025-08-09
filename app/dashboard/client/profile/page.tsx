"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  Key,
  Globe,
  Save,
  Upload,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateUser({
        full_name: profileData.fullName,
        phone: profileData.phone,
      })
      console.log("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error("Passwords don't match")
      return
    }
    console.log("Password change requested")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const accountStats = [
    { label: "Account Type", value: user?.user_type === "admin" ? "Administrator" : "Client", icon: User },
    { label: "Member Since", value: "January 2024", icon: Globe },
    { label: "Active Services", value: "5", icon: CheckCircle },
    { label: "Support Tickets", value: "3", icon: AlertCircle },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96&text=User" />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {user?.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") ||
                    user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.full_name || user?.email}</h2>
              <p className="text-gray-600 mb-2">{user?.email}</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  className={
                    user?.user_type === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }
                >
                  {user?.user_type === "admin" ? "Administrator" : "Client Account"}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accountStats.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <stat.icon className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="Enter your email"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+880 1XXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                      placeholder="Timezone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    placeholder="Enter your full address"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-gray-500">Receive codes via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-gray-500">Get notified of new logins</p>
                  </div>
                </div>
                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, loginAlerts: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={securitySettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({ ...securitySettings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={securitySettings.smsNotifications}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, smsNotifications: checked })}
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium">Email Notification Types</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Service Updates</p>
                      <p className="text-xs text-gray-500">Hosting, domain, and service notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Billing Reminders</p>
                      <p className="text-xs text-gray-500">Invoice and payment notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Marketing Updates</p>
                      <p className="text-xs text-gray-500">Promotions and new features</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Security Alerts</p>
                      <p className="text-xs text-gray-500">Login attempts and security events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Language</Label>
                <p className="text-sm text-gray-500 mb-3">Choose your preferred language</p>
                <select className="w-full p-2 border rounded-md">
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>

              <div>
                <Label className="text-base font-medium">Date Format</Label>
                <p className="text-sm text-gray-500 mb-3">How dates should be displayed</p>
                <select className="w-full p-2 border rounded-md">
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <Label className="text-base font-medium">Currency</Label>
                <p className="text-sm text-gray-500 mb-3">Your preferred currency for billing</p>
                <select className="w-full p-2 border rounded-md">
                  <option value="usd">USD ($)</option>
                  <option value="bdt">BDT (৳)</option>
                </select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Dashboard Preferences</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Compact View</p>
                      <p className="text-xs text-gray-500">Show more information in less space</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Auto-refresh Data</p>
                      <p className="text-xs text-gray-500">Automatically update dashboard data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Show Usage Warnings</p>
                      <p className="text-xs text-gray-500">Alert when approaching limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
