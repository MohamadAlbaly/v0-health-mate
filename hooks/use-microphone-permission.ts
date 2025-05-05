"use client"

import { useState, useEffect } from "react"

type MicrophonePermissionState = "prompt" | "granted" | "denied" | "unsupported"

export function useMicrophonePermission() {
  const [permissionState, setPermissionState] = useState<MicrophonePermissionState>("prompt")
  const [isChecking, setIsChecking] = useState(false)

  // Check if the browser supports the permissions API
  const isPermissionsApiSupported = () => {
    return typeof navigator !== "undefined" && "permissions" in navigator && "query" in navigator.permissions
  }

  // Check if getUserMedia is supported
  const isGetUserMediaSupported = () => {
    return typeof navigator !== "undefined" && "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices
  }

  // Check current permission state
  const checkPermissionState = async () => {
    setIsChecking(true)

    try {
      // First try the Permissions API if available
      if (isPermissionsApiSupported()) {
        const result = await navigator.permissions.query({ name: "microphone" as PermissionName })
        setPermissionState(result.state as MicrophonePermissionState)
        return result.state
      }
      // Fall back to getUserMedia
      else if (isGetUserMediaSupported()) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          // If we get here, permission was granted
          stream.getTracks().forEach((track) => track.stop()) // Clean up
          setPermissionState("granted")
          return "granted"
        } catch (err) {
          // If we get a permission error
          if (err instanceof Error && err.name === "NotAllowedError") {
            setPermissionState("denied")
            return "denied"
          }
          // For other errors, we can't determine the state
          setPermissionState("prompt")
          return "prompt"
        }
      } else {
        // Neither API is supported
        setPermissionState("unsupported")
        return "unsupported"
      }
    } catch (error) {
      console.error("Error checking microphone permission:", error)
      setPermissionState("prompt") // Default to prompt if we can't determine
      return "prompt"
    } finally {
      setIsChecking(false)
    }
  }

  // Request microphone permission
  const requestPermission = async (): Promise<boolean> => {
    setIsChecking(true)

    try {
      if (!isGetUserMediaSupported()) {
        setPermissionState("unsupported")
        return false
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop()) // Clean up
      setPermissionState("granted")
      return true
    } catch (error) {
      console.error("Error requesting microphone permission:", error)
      setPermissionState("denied")
      return false
    } finally {
      setIsChecking(false)
    }
  }

  // Check permission on mount
  useEffect(() => {
    checkPermissionState()
  }, [])

  return {
    permissionState,
    isChecking,
    checkPermissionState,
    requestPermission,
    isSupported: isGetUserMediaSupported(),
  }
}
