"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

interface LoadingStep {
  id: string
  label: string
  duration: number
}

interface EnhancedLoadingOverlayProps {
  isVisible: boolean
  onComplete: () => void
  steps?: LoadingStep[]
  title?: string
}

const defaultSteps: LoadingStep[] = [
  { id: "verify", label: "Verifying credentials", duration: 1000 },
  { id: "profile", label: "Loading user profile", duration: 800 },
  { id: "dashboard", label: "Preparing dashboard", duration: 600 },
  { id: "complete", label: "Almost ready", duration: 400 },
]

export function EnhancedLoadingOverlay({
  isVisible,
  onComplete,
  steps = defaultSteps,
  title = "Signing you in...",
}: EnhancedLoadingOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setCurrentStepIndex(0)
      setCompletedSteps(new Set())
      setProgress(0)
      return
    }

    let timeoutId: NodeJS.Timeout

    const processStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setProgress(100)
        setTimeout(onComplete, 300)
        return
      }

      const step = steps[stepIndex]
      setCurrentStepIndex(stepIndex)
      setProgress(((stepIndex + 1) / steps.length) * 100)

      timeoutId = setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, step.id]))
        processStep(stepIndex + 1)
      }, step.duration)
    }

    processStep(0)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isVisible, steps, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-600">Please wait while we set up your account</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id)
            const isCurrent = index === currentStepIndex
            const isPending = index > currentStepIndex

            return (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isCurrent
                    ? "bg-blue-50 border border-blue-200"
                    : isCompleted
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isCompleted
                      ? "text-green-700"
                      : isCurrent
                        ? "text-blue-700"
                        : isPending
                          ? "text-gray-400"
                          : "text-gray-600"
                  }`}
                >
                  {step.label}
                  {isCurrent && <span className="animate-pulse">...</span>}
                </span>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 Secure connection • Your data is encrypted and protected</p>
        </div>
      </div>
    </div>
  )
}
