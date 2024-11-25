import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "@/app/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Login/Register",
  description: "Login and Registration pages",
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${inter.className} antialiased`}>
    {children}
  </div>
  )
}