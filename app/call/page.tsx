"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Mic, MicOff, Phone, Volume2, VolumeX, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUltraVoxClient } from "@/lib/ultravox-client"
import { useMicrophonePermission } from "@/hooks/use-microphone-permission"

// Hook to keep the screen on
const useWakeLock = () => {
  const wakeLockRef = useRef<any | null>(null)
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isWakeLockSupported, setIsWakeLockSupported] = useState(false)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  // Fallback method: create a hidden video element that plays continuously
  const createFallbackWakeLock = () => {
    console.log("Using fallback wake lock method")
    setIsUsingFallback(true)

    // Clear any existing fallback timer
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current)
    }

    // Create a timer that periodically interacts with the DOM
    // This can help prevent screen sleep on some devices
    fallbackTimerRef.current = setInterval(() => {
      // Force a small DOM update to keep the screen active
      document.title = document.title.includes("|") ? document.title.replace(" |", "") : document.title + " |"
    }, 30000) // Every 30 seconds
  }

  const requestWakeLock = async () => {
    try {
      // Check if the Wake Lock API is available
      if ("wakeLock" in navigator && typeof navigator.wakeLock?.request === "function") {
        setIsWakeLockSupported(true)

        try {
          // Request a screen wake lock
          wakeLockRef.current = await navigator.wakeLock.request("screen")
          console.log("Wake Lock is active")

          // Add a listener for when the wake lock is released
          wakeLockRef.current.addEventListener("release", () => {
            console.log("Wake Lock was released")
            // Try to reacquire the wake lock if it's released
            requestWakeLock().catch(() => createFallbackWakeLock())
          })

          setIsUsingFallback(false)
          return true
        } catch (err) {
          console.warn(`Wake Lock API request failed: ${err}. Using fallback.`)
          createFallbackWakeLock()
          return false
        }
      } else {
        console.log("Wake Lock API not supported, using fallback")
        setIsWakeLockSupported(false)
        createFallbackWakeLock()
        return false
      }
    } catch (err) {
      console.error(`Error with wake lock: ${err}`)
      createFallbackWakeLock()
      return false
    }
  }

  const releaseWakeLock = () => {
    // Clear the fallback timer if it exists
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }

    setIsUsingFallback(false)

    // Release the actual wake lock if it exists
    if (wakeLockRef.current) {
      try {
        wakeLockRef.current
          .release()
          .then(() => {
            wakeLockRef.current = null
            console.log("Wake Lock released successfully")
          })
          .catch((err: any) => {
            console.error(`Error releasing wake lock: ${err}`)
          })
      } catch (err) {
        console.error(`Error releasing wake lock: ${err}`)
      }
    }
  }

  // Handle visibility change events to reacquire wake lock when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && wakeLockRef.current === null && isWakeLockSupported) {
        requestWakeLock().catch(() => createFallbackWakeLock())
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      releaseWakeLock()
    }
  }, [isWakeLockSupported])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      releaseWakeLock()
    }
  }, [])

  return {
    requestWakeLock,
    releaseWakeLock,
    isWakeLockSupported,
    isUsingFallback,
  }
}

// Simple hook for playing audio
const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audio.current = new Audio(url)
    }
    return () => {
      if (audio.current) {
        audio.current.pause()
        audio.current.currentTime = 0
      }
    }
  }, [url])

  const play = () => {
    if (audio.current) {
      audio.current.currentTime = 0
      audio.current.play().catch((e) => console.log("Audio play error:", e))
    }
  }

  const stop = () => {
    if (audio.current) {
      audio.current.pause()
      audio.current.currentTime = 0
    }
  }

  return { play, stop }
}

export default function CallPage() {
  const router = useRouter()
  const [callStatus, setCallStatus] = useState<
    "initializing" | "ringing" | "ongoing" | "joined" | "ended" | "error" | "permission_required" | "connecting"
  >("initializing")
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [agentName, setAgentName] = useState("Mate")
  const [statusMessage, setStatusMessage] = useState("Initializing...")
  const [agentActivity, setAgentActivity] = useState<"idle" | "listening" | "speaking">("idle")
  const ultravoxClient = useRef(getUltraVoxClient())
  const callInitialized = useRef(false)
  const ringAudioRef = useRef<HTMLAudioElement | null>(null)

  // State for microphone notification
  const [showMicNotification, setShowMicNotification] = useState(false)
  const micNotificationTimer = useRef<NodeJS.Timeout | null>(null)

  // Audio effects
  const ringSound = useAudio("/sounds/ring.mp3")
  const connectedSound = useAudio("/sounds/call-connected.mp3")
  const endSound = useAudio("/sounds/call-end.mp3")

  // Use our microphone permission hook
  const {
    permissionState,
    isChecking,
    requestPermission,
    isSupported: isMicrophoneSupported,
  } = useMicrophonePermission()

  // Add this after the existing hooks
  const { requestWakeLock, releaseWakeLock, isWakeLockSupported, isUsingFallback } = useWakeLock()

  // Initialize ring sound
  useEffect(() => {
    if (typeof window !== "undefined") {
      ringAudioRef.current = new Audio("/sounds/ring.mp3")
      ringAudioRef.current.loop = true
      return () => {
        if (ringAudioRef.current) {
          ringAudioRef.current.pause()
          ringAudioRef.current = null
        }
      }
    }
  }, [])

  // Check microphone permission first
  useEffect(() => {
    if (isChecking) return

    if (!isMicrophoneSupported) {
      setCallStatus("error")
      setStatusMessage("Microphone not supported on this device")
      return
    }

    if (permissionState === "denied") {
      setCallStatus("permission_required")
      setStatusMessage("Microphone permission required")
      return
    }

    // If permission is granted or we need to prompt, proceed with call initialization
    if ((permissionState === "granted" || permissionState === "prompt") && !callInitialized.current) {
      initializeCall()
    }
  }, [permissionState, isChecking, isMicrophoneSupported])

  // Initialize call with UltraVox
  const initializeCall = async () => {
    if (callInitialized.current) return
    callInitialized.current = true

    // If permission state is prompt, request permission first
    if (permissionState === "prompt") {
      setStatusMessage("Requesting microphone access...")
      const granted = await requestPermission()
      if (!granted) {
        setCallStatus("permission_required")
        setStatusMessage("Microphone permission denied")
        callInitialized.current = false
        return
      }
    }

    try {
      setStatusMessage("Calling Mate...")
      ringSound.play() // Start ringing sound

      // Play ringing sound
      if (ringAudioRef.current) {
        ringAudioRef.current.play().catch((err) => console.log("Could not play ring sound:", err))
      }

      // Create a session with UltraVox via n8n
      const response = await fetch("/api/ultravox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const sessionData = await response.json()
      const { callId, joinUrl, apiKey, mock } = sessionData

      // Validate the URL
      let validUrl = true
      try {
        if (joinUrl) {
          new URL(joinUrl)
        } else {
          validUrl = false
        }
      } catch (e) {
        validUrl = false
        console.error("Invalid URL received:", joinUrl)
      }

      if (!validUrl) {
        throw new Error("Invalid URL received from API")
      }

      // Set up status change handler
      ultravoxClient.current.onStatusChange((status) => {
        console.log("UltraVox status:", status)
        switch (status) {
          case "connecting":
            setCallStatus("connecting")
            setStatusMessage("Calling...")
            setAgentActivity("idle")
            break
          case "connected":
            setCallStatus("connecting") // Still connecting until joined
            ringSound.stop() // Stop ringing sound
            connectedSound.play() // Play connected sound
            setStatusMessage("Connected")
            setAgentActivity("idle")
            break
          case "joined":
            setCallStatus("joined")
            setStatusMessage(mock ? "Call in progress" : "Call in progress")
            setAgentActivity("listening")
            // Show microphone notification when call is first joined
            showMicrophoneNotification()
            break
          case "idle":
            // SDK is initialized but not yet streaming
            setStatusMessage("Waiting for microphone...")
            break
          case "listening":
            // Agent is listening to user input
            setCallStatus("ongoing")
            setStatusMessage(mock ? "Call in progress" : "Call in progress")
            setAgentActivity("listening")
            break
          case "speaking":
            // Agent is speaking
            setCallStatus("ongoing")
            setAgentActivity("speaking")
            break
          case "disconnected":
            ringSound.stop()
            endSound.play()
            setCallStatus("ended")
            setStatusMessage("Call ended")
            setAgentActivity("idle")
            break
          case "error":
            ringSound.stop()
            setCallStatus("error")
            setStatusMessage("Call failed")
            setAgentActivity("idle")
            break
          default:
            setStatusMessage(status)
        }
      })

      // Set up transcript handler (still needed for internal state)
      ultravoxClient.current.onTranscript(() => {
        // We're not displaying transcripts anymore, but we still need to handle the events
      })

      // Connect to UltraVox
      await ultravoxClient.current.connect({
        streamUrl: joinUrl,
        sessionId: callId,
        apiKey: apiKey,
        isMock: mock,
      })

      setCallStatus("ringing")
      try {
        const wakeLockSuccess = await requestWakeLock()
        console.log("Wake lock request result:", wakeLockSuccess ? "success" : "using fallback")
      } catch (error) {
        console.warn("Could not acquire wake lock:", error)
      }
    } catch (error) {
      console.error("Failed to initialize call:", error)
      setCallStatus("error")
      setStatusMessage(error instanceof Error ? error.message : "Call failed")

      // Stop ringing sound
      if (ringAudioRef.current) {
        ringAudioRef.current.pause()
      }

      // Fallback to mock mode
      ultravoxClient.current.connect({
        streamUrl: "wss://mock.ultravox.ai/stream",
        sessionId: "mock-session",
        isMock: true,
      })
    }
  }

  // Function to show microphone notification with auto-fade
  const showMicrophoneNotification = () => {
    // Clear any existing timer
    if (micNotificationTimer.current) {
      clearTimeout(micNotificationTimer.current)
    }

    // Show the notification
    setShowMicNotification(true)

    // Set timer to hide it after 5 seconds (if not muted)
    if (!isMuted) {
      micNotificationTimer.current = setTimeout(() => {
        setShowMicNotification(false)
      }, 5000)
    }
  }

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (callStatus === "ongoing") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [callStatus])

  // Format call duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = async () => {
    ringSound.stop()
    endSound.play()
    await ultravoxClient.current.disconnect()
    setCallStatus("ended")
    releaseWakeLock()
    setStatusMessage("Call ended")
    setAgentActivity("idle")

    // Simulate call ending animation before navigating back
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    try {
      ultravoxClient.current.setMuted(newMutedState)
      console.log("Microphone mute state set to:", newMutedState)

      // Show notification when unmuting
      if (!newMutedState) {
        showMicrophoneNotification()
      } else {
        // When muting, make sure notification is visible and clear any auto-hide timer
        setShowMicNotification(true)
        if (micNotificationTimer.current) {
          clearTimeout(micNotificationTimer.current)
          micNotificationTimer.current = null
        }
      }
    } catch (error) {
      console.error("Failed to set mute state:", error)
      // Revert the UI state if the operation failed
      setIsMuted(!newMutedState)
    }
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    // In a real implementation, we would toggle the audio output device here
  }

  // Function to retry connection with a fresh joinUrl
  const handleRetryConnection = async () => {
    if (callStatus !== "error" && callStatus !== "permission_required") return

    setCallStatus("initializing")
    setStatusMessage("Retrying...")
    callInitialized.current = false

    // For permission issues, request permission again
    if (callStatus === "permission_required") {
      const granted = await requestPermission()
      if (!granted) {
        setCallStatus("permission_required")
        setStatusMessage("Microphone permission required")
        return
      }
    }

    // Force a new connection attempt
    setTimeout(() => {
      callInitialized.current = false
      initializeCall()
    }, 100)
  }

  // Render permission request UI if needed
  if (callStatus === "permission_required") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#e0f7f4] flex flex-col items-center justify-center p-6 text-gray-800">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="mb-6">
            <Mic className="w-16 h-16 mx-auto mb-4 text-[#26D0B2]" />
            <h2 className="text-2xl font-bold mb-2">Microphone Access Required</h2>
            <p className="mb-4 text-gray-600">
              HealthMate needs access to your microphone to make calls. Please allow microphone access in your browser
              settings.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleRetryConnection}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#29B6F6] to-[#26D0B2] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              Request Permission Again
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e0f7f4] flex flex-col items-center justify-between p-6 text-gray-800">
      {/* Status bar */}
      <div className="w-full flex justify-between items-center pt-6">
        <div className="text-sm font-medium text-gray-600">HealthMate</div>
        <div className="text-sm font-medium">
          {callStatus === "initializing" || callStatus === "connecting" || callStatus === "ringing"
            ? callStatus === "initializing"
              ? "Initializing..."
              : "Calling..."
            : callStatus === "ongoing" || callStatus === "joined"
              ? formatDuration(callDuration)
              : callStatus === "error"
                ? "Call failed"
                : "Call ended"}
        </div>
      </div>

      {/* Avatar and call info */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        {/* Secure call indicator */}
        {(callStatus === "ongoing" || callStatus === "joined") && (
          <div className="flex items-center mb-4 bg-white/20 px-3 py-1 rounded-full">
            <Shield size={14} className="mr-1" />
            <span className="text-xs font-medium">Secure call</span>
          </div>
        )}
        {(callStatus === "ongoing" || callStatus === "joined") && isUsingFallback && (
          <div className="flex items-center mb-2 bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-yellow-700">Keep screen active during call</span>
          </div>
        )}
        <div className="relative w-36 h-36 mb-6">
          {/* Animated rings for ringing state */}
          {callStatus === "ringing" && (
            <>
              <div
                className="absolute inset-0 rounded-full bg-[#26D0B2]/10 animate-ping"
                style={{ animationDuration: "1.5s" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full bg-[#26D0B2]/5 animate-ping"
                style={{ animationDuration: "2s", animationDelay: "0.3s" }}
              ></div>
            </>
          )}

          {/* Pulse animation for speaking */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#29B6F6]/20 to-[#26D0B2]/20 rounded-full ${
              agentActivity === "speaking" ? "animate-pulse" : ""
            }`}
            style={{ animationDuration: "1.5s", opacity: callStatus === "ended" ? 0 : 0.5 }}
          ></div>
          <div
            className={`absolute inset-0 bg-gradient-to-r from-[#29B6F6]/10 to-[#26D0B2]/10 rounded-full ${
              agentActivity === "speaking" ? "animate-pulse" : ""
            }`}
            style={{ animationDuration: "2.5s", animationDelay: "0.5s", opacity: callStatus === "ended" ? 0 : 0.3 }}
          ></div>

          {/* Avatar image */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
            <Image
              src="/circular-avatar.png"
              alt={agentName}
              width={144}
              height={144}
              className="object-cover"
              style={{
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                filter: callStatus === "ended" ? "grayscale(100%)" : "none",
                opacity: callStatus === "ended" ? 0.7 : 1,
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Activity indicator */}
          {agentActivity === "speaking" && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-1.5 shadow-md z-20">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span
                  className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></span>
                <span className="text-xs font-medium text-gray-800">Speaking</span>
              </div>
            </div>
          )}

          {agentActivity === "listening" && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-1.5 shadow-md z-20">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-gray-800">Listening</span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          )}

          {callStatus === "ringing" && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-1.5 shadow-md z-20">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-medium text-gray-800">Ringing</span>
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-800">{agentName}</h1>
        <p
          className={`text-sm mb-4 ${
            callStatus === "connecting" || callStatus === "initializing" || callStatus === "ringing"
              ? "animate-pulse"
              : callStatus === "ended" || callStatus === "error"
                ? "opacity-70"
                : ""
          }`}
        >
          {callStatus === "initializing"
            ? "Initializing call..."
            : callStatus === "connecting" || callStatus === "ringing"
              ? "Ringing..."
              : callStatus === "ongoing" || callStatus === "joined"
                ? "In call"
                : callStatus === "error"
                  ? "Call failed"
                  : "Call ended"}
        </p>

        {/* Microphone status notification with fade animation */}
        <div
          className={`bg-white/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-sm mb-8 transition-all duration-500 ${
            showMicNotification && (callStatus === "ongoing" || callStatus === "joined")
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-4 pointer-events-none"
          }`}
        >
          <p className="text-sm text-gray-600">{isMuted ? "You are muted" : "Your microphone is on"}</p>
        </div>

        {/* Error retry button */}
        {callStatus === "error" && (
          <button
            onClick={handleRetryConnection}
            className="bg-white hover:bg-gray-50 transition-colors rounded-xl px-6 py-3 text-sm font-medium mb-8 shadow-md border border-gray-100"
          >
            Retry Call
          </button>
        )}
      </div>

      {/* Call controls */}
      <div className="w-full max-w-md flex justify-around items-center mb-6">
        <button
          onClick={toggleMute}
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isMuted ? "bg-red-100 text-red-500 border-2 border-red-300" : "bg-white/30 hover:bg-white/40 text-gray-800"
          } transition-all shadow-md`}
          disabled={callStatus === "ended" || callStatus === "error"}
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button
          onClick={handleEndCall}
          className={`w-20 h-20 rounded-full flex items-center justify-center ${
            callStatus === "ended" || callStatus === "error" ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
          } shadow-lg transform transition-all ${
            callStatus === "ended" || callStatus === "error" ? "scale-90 opacity-70" : "hover:scale-105"
          }`}
          disabled={callStatus === "ended" || callStatus === "error"}
          aria-label="End call"
        >
          <Phone size={32} className="rotate-135 text-white" />
        </button>

        <button
          onClick={toggleSpeaker}
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isSpeakerOn ? "bg-white/30 hover:bg-white/40" : "bg-white/20 hover:bg-white/30"
          } transition-all shadow-md`}
          disabled={callStatus === "ended" || callStatus === "error"}
          aria-label={isSpeakerOn ? "Turn off speaker" : "Turn on speaker"}
        >
          {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Error message */}
      {callStatus === "error" && (
        <div className="absolute bottom-32 left-0 right-0 flex justify-center">
          <div className="bg-red-500/80 px-4 py-2 rounded-lg text-white text-sm shadow-md">
            Unable to reach Mate. Please check your connection and try again.
          </div>
        </div>
      )}
    </div>
  )
}
