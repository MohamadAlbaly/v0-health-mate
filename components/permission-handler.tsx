"use client"

import { useEffect } from "react"
import { useMicrophonePermission } from "@/hooks/use-microphone-permission"

export default function PermissionHandler() {
  const { permissionState, requestPermission, isSupported } = useMicrophonePermission()

  useEffect(() => {
    // Only request permission if the browser supports it and permission hasn't been granted yet
    if (isSupported && permissionState === "prompt") {
      // Small delay to not block the initial page load
      const timer = setTimeout(() => {
        requestPermission()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [permissionState, requestPermission, isSupported])

  // This is an invisible component, it doesn't render anything
  return null
}
