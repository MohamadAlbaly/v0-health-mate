import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path is for the UltraVox API
  if (path.startsWith("/api/ultravox")) {
    // Check for API key in environment variables
    const apiKey = process.env.ULTRAVOX_API_KEY
    const agentId = process.env.ULTRAVOX_AGENT_ID

    if (!apiKey || !agentId) {
      return NextResponse.json({ error: "UltraVox API credentials not configured" }, { status: 500 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/ultravox/:path*"],
}
