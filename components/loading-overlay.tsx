"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  onComplete: () => void
}

export function LoadingOverlay({ isVisible, message = "Loading...", onComplete }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progress}% complete</p>
        </div>
      </div>
    </div>
  )
}
