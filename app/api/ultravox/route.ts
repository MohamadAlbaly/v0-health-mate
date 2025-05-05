import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Call n8n to create the UltraVox call using the production URL
    const response = await fetch("https://nitro1908.app.n8n.cloud/webhook/ultravox/new-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`n8n webhook returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    // Validate the joinUrl before returning it
    let validUrl = true
    try {
      if (data.joinUrl) {
        new URL(data.joinUrl)
      } else {
        validUrl = false
      }
    } catch (e) {
      validUrl = false
    }

    if (!validUrl) {
      throw new Error("Invalid URL received from webhook")
    }

    return NextResponse.json({
      callId: data.callId,
      joinUrl: data.joinUrl,
      apiKey: process.env.ULTRAVOX_API_KEY || "",
      mock: false,
    })
  } catch (error) {
    // Return mock data for development if there's an error
    return NextResponse.json(
      {
        callId: "mock-call-" + Date.now(),
        joinUrl: "wss://mock.ultravox.ai/stream",
        apiKey: process.env.ULTRAVOX_API_KEY || "",
        mock: true,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 },
    )
  }
}
