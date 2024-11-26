'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import UserEmail from "@/components/ui/UserEmail"
import { createClient } from '@/utils/supabase/client'

const navItems = [
  { name: "Home", href: "/pages/home" },
  { name: "Test Values", href: "/pages/testvalues" },
  { name: "Product List", href: "/pages/productlist" },
  { name: "Add Product", href: "/pages/addproduct" }
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="flex items-center justify-between p-6 border-b-2 shadow">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                           (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-white font-bold text-center p-4 rounded w-36 ml-4 first:ml-0",
                isActive ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
      <div className="ml-auto flex items-center">
        <UserEmail />
        <button
          onClick={handleLogout}
          className="text-white font-bold text-center p-4 rounded w-36 ml-4 bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
