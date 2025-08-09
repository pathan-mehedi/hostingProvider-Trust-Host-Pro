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
import { Loader2, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AuthHeader } from "@/components/auth-header"
import { AuthFooter } from "@/components/auth-footer"
import { EnhancedLoadingOverlay } from "@/components/enhanced-loading-overlay"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const [error, setError] = useState("")
  const { signUp, user } = useAuth()

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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    setShowLoadingOverlay(true)

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      phone: formData.phone,
      user_type: "client",
    })

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

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  const registerSteps = [
    { id: "validate", label: "Validating information", duration: 1000 },
    { id: "create", label: "Creating your account", duration: 1200 },
    { id: "setup", label: "Setting up profile", duration: 800 },
    { id: "dashboard", label: "Preparing dashboard", duration: 600 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <EnhancedLoadingOverlay
        isVisible={showLoadingOverlay}
        onComplete={handleLoadingComplete}
        steps={registerSteps}
        title="Creating your account..."
      />

      <AuthHeader
        rightContent={
          <Link href="/auth/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Already have an account? <span className="font-medium text-blue-600">Sign in</span>
          </Link>
        }
      />

      {/* Main Content */}
      <div className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Join Trust Host Pro
            </h1>
            <p className="text-gray-600">Create your account and start your hosting journey</p>
          </div>

          {/* Register Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Create Account</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

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

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength(formData.password))}`}
                            style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {getStrengthText(passwordStrength(formData.password))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-500 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="mt-1"
                    disabled={loading}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms-conditions" className="text-blue-600 hover:text-blue-700 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 font-medium">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  disabled={loading || !acceptTerms}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                  <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center w-full h-12 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Sign In Instead
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  )
}
