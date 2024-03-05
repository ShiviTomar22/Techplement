import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' 

  const token = request.cookies.get('token')?.value || ''
  const access_token=request.cookies.get("next-auth.session-token")?.value||""

  console.log("access_token",access_token);
  

  if(isPublicPath && (token||access_token)) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (!isPublicPath && !token && !access_token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard'
  ]
}