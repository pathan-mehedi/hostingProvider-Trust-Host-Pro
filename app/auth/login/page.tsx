"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight, Info, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AuthHeader } from "@/components/auth-header"
import { AuthFooter } from "@/components/auth-footer"
import { EnhancedLoadingOverlay } from "@/components/enhanced-loading-overlay"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const [error, setError] = useState("")
  const { signIn, user } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // This will be handled by the AuthProvider
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setShowLoadingOverlay(true)

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { error } = await signIn(formData.email, formData.password)

    if (error) {
      setError(error.message)
      setLoading(false)
      setShowLoadingOverlay(false)
    }
    // Success case is handled by AuthProvider redirect
  }

  const handleLoadingComplete = () => {
    setShowLoadingOverlay(false)
    setLoading(false)
  }

  const loginSteps = [
    { id: "verify", label: "Verifying credentials", duration: 1200 },
    { id: "security", label: "Security check", duration: 800 },
    { id: "profile", label: "Loading user profile", duration: 600 },
    { id: "dashboard", label: "Preparing dashboard", duration: 400 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <EnhancedLoadingOverlay
        isVisible={showLoadingOverlay}
        onComplete={handleLoadingComplete}
        steps={loginSteps}
        title="Signing you in..."
      />

      <AuthHeader
        rightContent={
          <Link href="/auth/register" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Don't have an account? <span className="font-medium text-blue-600">Sign up</span>
          </Link>
        }
      />

      {/* Main Content */}
      <div className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Demo Credentials */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-2">
                <div>
                  <strong>Demo Super Admin:</strong>
                  <br />📧 admin@trusthostpro.com
                  <br />🔑 Admin123!
                </div>
                <div className="text-xs opacity-75">Or create a new account to get started</div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Trust Host Pro account</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} disabled={loading} />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">New to Trust Host Pro?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center w-full h-12 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Create New Account
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Your connection is secure and encrypted</span>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  )
}
