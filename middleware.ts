import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Just pass through all requests for now
  return NextResponse.next()
}

// Limit the matcher to only specific paths if needed
export const config = {
  matcher: ["/api/:path*"],
}
