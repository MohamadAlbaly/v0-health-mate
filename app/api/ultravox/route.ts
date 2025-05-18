import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Ensure this route is not cached

export async function POST(request: NextRequest) {
  try {
    // Call n8n to create the UltraVox call using the production URL
    const response = await fetch("https://nitrobally.app.n8n.cloud/webhook/ultravox/new-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
      cache: "no-store",
      next: { revalidate: 0 },
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

    // Include the API key securely from server-side environment variables
    return NextResponse.json(
      {
        callId: data.callId,
        joinUrl: data.joinUrl,
        apiKey: process.env.ULTRAVOX_API_KEY || "",
        mock: false,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error in UltraVox API route:", error)
    // Return mock data for development if there's an error
    return NextResponse.json(
      {
        callId: "mock-call-" + Date.now(),
        joinUrl: "wss://mock.ultravox.ai/stream",
        apiKey: process.env.ULTRAVOX_API_KEY || "",
        mock: true,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}
