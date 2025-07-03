import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Xenon Robotics - Smart Automation & Robotics Solutions",
  description:
    "Kerala's premier robotics innovation hub. Custom automation, IoT solutions, and embedded systems for industries, students, and startups.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div id="top"></div>
        {children}
      </body>
    </html>
  )
}
