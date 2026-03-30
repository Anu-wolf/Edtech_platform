import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"

import "./globals.css"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LEARNLY - Stress Less. Study Smart.",
  description:
    "A realistic, AI-powered assessment platform designed to reduce stress and enhance learning through personalized feedback and wellness integration.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased pb-20 md:pb-0`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <MobileNav />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
