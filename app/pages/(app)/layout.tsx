import { Navigation } from "@/components/ui/navigation"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Application",
  description: "This is my Next.js application",
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${inter.className} antialiased`}>
       <Navigation />
    {children}
  </div>
  )
}