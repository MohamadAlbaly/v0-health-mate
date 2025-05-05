import type React from "react"
import type { Metadata } from "next"
import { poppins } from "./fonts"
import "./globals.css"
import PermissionHandler from "@/components/permission-handler"

export const metadata: Metadata = {
  title: "HealthMate",
  description: "Your personal health companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable}`}>
        <PermissionHandler />
        {children}
      </body>
    </html>
  )
}
