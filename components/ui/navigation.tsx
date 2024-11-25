'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/pages/home" },
  { name: "Test Values", href: "/pages/testvalues" },
  { name: "Product List", href: "/pages/productlist" },
  { name: "Add Product", href: "/pages/addproduct" }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex p-6 border-b-2 shadow">
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
    </nav>
  )
}