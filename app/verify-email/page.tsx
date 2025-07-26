"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResendSuccess(true)
      setCountdown(60) // 60 second cooldown
    } catch (error) {
      console.error("Failed to resend email")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, rgba(0, 255, 135, 0.1) 0%, transparent 50%), linear-gradient(45deg, #00ff87, #60efff, #ffffff)`,
        }}
      />

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <Image src="/images/myryde-logo.png" alt="MyRyde Logo" width={200} height={80} className="h-16 w-auto" />
          </div>
          <CardTitle className="text-3xl font-bold">Verify Your Email</CardTitle>
          <CardDescription className="text-lg">We've sent a verification link to your email address</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Check Your Inbox</h3>
              <p className="text-gray-600">
                Click the verification link in the email we sent you to activate your MyRyde account.
              </p>
            </div>
          </div>

          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">Verification email sent successfully!</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your email inbox (and spam folder)</li>
              <li>• Click the verification link</li>
              <li>• Your account will be activated automatically</li>
              <li>• Start booking rides with MyRyde!</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || countdown > 0}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Sending...
                </div>
              ) : countdown > 0 ? (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend in {countdown}s
                </div>
              ) : (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </div>
              )}
            </Button>

            <Button
              asChild
              className="w-full"
              style={{
                background: "linear-gradient(135deg, #00ff87, #60efff)",
                border: "none",
              }}
            >
              <Link href="/login">Back to Sign In</Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Having trouble?{" "}
              <Link href="/support" className="text-green-600 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
