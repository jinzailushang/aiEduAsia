import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // 如果没有配置 Supabase，跳过认证检查
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })

  // 刷新会话（如果过期）
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 定义需要认证的路由
  const protectedRoutes = [
    '/dashboard',
    '/learn',
    '/profile',
    '/admin'
  ]

  // 定义管理员路由
  const adminRoutes = [
    '/admin'
  ]

  const { pathname } = req.nextUrl

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // 检查是否是管理员路由
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  )

  // 如果是受保护的路由但用户未登录
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirect_to', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 如果是管理员路由但用户不是管理员
  if (isAdminRoute && session) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}