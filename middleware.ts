import { NextResponse, NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'


export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const protectedRoutes = [
      '/pages/home',
      '/pages/testvalues',
      '/pages/productlist',
      '/pages/addproduct',
      '/pages/editproduct'
    ]

    if (protectedRoutes.includes(request.nextUrl.pathname) && !user) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return response
  } catch (e) {
    return NextResponse.next()
  }
}



export const config = {
  matcher: [
    '/pages/home',
    '/pages/testvalues',
    '/pages/productlist',
    '/pages/addproduct',
  ],
}