import { UltravoxSession } from "ultravox-client"

export class UltraVoxClient {
  private session: UltravoxSession | null = null
  private isConnected = false
  private isMuted = false
  private onStatusChangeCallback: ((status: string) => void) | null = null
  private onTranscriptCallback: ((text: string, isAgent: boolean) => void) | null = null
  private sessionId: string | null = null
  private isMockMode = false
  private mockModeReason: string | null = null
  private mockTimers: NodeJS.Timeout[] = []

  constructor() {
    // Initialize client
  }

  public async connect(options: {
    streamUrl: string
    sessionId: string
    apiKey: string
    isMock?: boolean
  }) {
    this.sessionId = options.sessionId
    this.isMockMode = options.isMock || false
    let connectionError: Error | null = null

    // Validate URL before proceeding
    if (!this.isMockMode && !this.isValidUrl(options.streamUrl)) {
      connectionError = new Error(`Invalid URL: ${options.streamUrl}`)
      this.mockModeReason = `Invalid URL provided: ${options.streamUrl}`
      this.isMockMode = true
    }

    if (this.isConnected) {
      return
    }

    if (this.isMockMode) {
      this.mockModeReason = this.mockModeReason || "Mock mode explicitly requested"
    }

    this.useMockMode(this.mockModeReason || "Default mock mode reason")

    try {
      this.setStatus("connecting")

      // Create a new session with the API key
      this.session = new UltravoxSession({
        apiKey: options.apiKey || "",
      })

      // Set up event listeners
      this.setupEventListeners()

      // Join the call using the SDK
      await this.session.joinCall(options.streamUrl)

      this.isConnected = true
      this.setStatus("connected")
    } catch (error) {
      connectionError = error instanceof Error ? error : new Error(String(error))
      this.mockModeReason = `WebRTC connection error: ${connectionError.message}`
      this.isMockMode = true
    }
  }

  // Helper method to validate URLs
  private isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString)
      return true
    } catch (e) {
      return false
    }
  }

  // Helper method to sanitize URLs for logging (remove sensitive info)
  private sanitizeUrl(urlString: string): string {
    try {
      if (urlString.startsWith("wss://") || urlString.startsWith("ws://")) {
        return urlString.replace(/api_key=([^&]+)/, "api_key=REDACTED")
      }
      return urlString
    } catch (e) {
      return "invalid-url"
    }
  }

  private setupEventListeners() {
    if (!this.session) return

    // Listen for status changes
    this.session.addEventListener("status", () => {
      const status = this.session?.status
      if (status) {
        this.setStatus(status)
      }
    })

    // Listen for transcripts
    this.session.addEventListener("transcripts", () => {
      if (!this.session) return

      const transcripts = this.session.transcripts
      if (transcripts && transcripts.length > 0) {
        const lastTranscript = transcripts[transcripts.length - 1]
        if (this.onTranscriptCallback) {
          this.onTranscriptCallback(lastTranscript.text, lastTranscript.speaker === "agent")
        }
      }
    })
  }

  private useMockMode(reason: string) {
    this.isMockMode = true
    this.setStatus("connecting")

    // Clear any existing timers
    this.clearMockTimers()

    // Simulate connection sequence
    const timer1 = setTimeout(() => {
      this.isConnected = true
      this.setStatus("connected")

      const timer2 = setTimeout(() => {
        this.setStatus("joined")

        const timer3 = setTimeout(() => {
          this.setStatus("listening")

          // Simulate some initial conversation after a delay
          const timer4 = setTimeout(() => {
            if (this.onTranscriptCallback) {
              this.onTranscriptCallback("Hello, I'm your HealthMate assistant. How can I help you today?", true)
            }
            this.setStatus("speaking")

            // Back to listening after "speaking"
            const timer5 = setTimeout(() => {
              this.setStatus("listening")
            }, 3000)

            this.mockTimers.push(timer5)
          }, 2000)

          this.mockTimers.push(timer4)
        }, 1000)

        this.mockTimers.push(timer3)
      }, 1500)

      this.mockTimers.push(timer2)
    }, 2000)

    this.mockTimers.push(timer1)
  }

  private clearMockTimers() {
    this.mockTimers.forEach((timer) => clearTimeout(timer))
    this.mockTimers = []
  }

  public setMuted(muted: boolean) {
    try {
      this.isMuted = muted

      // In a real implementation, mute the microphone
      if (this.session && !this.isMockMode) {
        // Check which method is available on the session object
        if (typeof this.session.setMicrophoneMuted === "function") {
          this.session.setMicrophoneMuted(muted)
        } else if (typeof this.session.setMuted === "function") {
          this.session.setMuted(muted)
        } else if (typeof this.session.muted === "boolean") {
          this.session.muted = muted
        } else {
          // Fall back to mock behavior
          this.handleMockMuteState(muted)
          return
        }
      } else {
        // In mock mode, handle mute state
        this.handleMockMuteState(muted)
      }
    } catch (error) {
      // Continue with mock behavior if real implementation fails
      this.handleMockMuteState(muted)
    }
  }

  // Separate method to handle mock mute behavior
  private handleMockMuteState(muted: boolean) {
    // Clear any existing mock timers related to speaking
    this.mockTimers.forEach((timer) => clearTimeout(timer))

    // In mock mode, simulate user speaking when unmuted
    if (this.isMockMode && !muted) {
      const timer1 = setTimeout(() => {
        if (!this.isMuted && this.onTranscriptCallback) {
          this.onTranscriptCallback("I'd like to schedule an appointment with Dr. Chen.", false)

          // Simulate agent response
          const timer2 = setTimeout(() => {
            this.setStatus("speaking")
            if (this.onTranscriptCallback) {
              this.onTranscriptCallback(
                "I can help you schedule that appointment. Dr. Chen has availability on Thursday at 2pm or Friday at 10am. Which would you prefer?",
                true,
              )
            }

            // Back to listening
            const timer3 = setTimeout(() => {
              this.setStatus("listening")
            }, 3000)

            this.mockTimers.push(timer3)
          }, 1500)

          this.mockTimers.push(timer2)
        }
      }, 2000)

      this.mockTimers.push(timer1)
    }
  }

  public async disconnect() {
    try {
      // Clear all mock timers
      this.clearMockTimers()

      // Properly leave the call using the session
      if (!this.isMockMode && this.session) {
        await this.session.leaveCall()
      }

      this.isConnected = false
      this.setStatus("disconnected")
    } catch (error) {
      // Handle error silently
    }
  }

  public onStatusChange(callback: (status: string) => void) {
    this.onStatusChangeCallback = callback
  }

  public onTranscript(callback: (text: string, isAgent: boolean) => void) {
    this.onTranscriptCallback = callback
  }

  private setStatus(status: string) {
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status)
    }
  }

  // Method to get connection diagnostics
  public getDiagnostics() {
    return {
      isConnected: this.isConnected,
      isMockMode: this.isMockMode,
      sessionId: this.sessionId,
      clientStatus: this.session ? this.session.status : "no-client",
      mockModeReason: this.mockModeReason,
      sdkAvailable: typeof UltravoxSession !== "undefined",
      isMuted: this.isMuted,
    }
  }
}

// Create singleton instance
let ultravoxClientInstance: UltraVoxClient | null = null

export function getUltraVoxClient(): UltraVoxClient {
  if (typeof window === "undefined") {
    // Server-side rendering - return a mock client
    return {
      connect: async () => {},
      disconnect: () => {},
      setMuted: () => {},
      onStatusChange: () => {},
      onTranscript: () => {},
      getDiagnostics: () => ({}),
    } as unknown as UltraVoxClient
  }

  if (!ultravoxClientInstance) {
    ultravoxClientInstance = new UltraVoxClient()
  }
  return ultravoxClientInstance
}
