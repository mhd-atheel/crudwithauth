import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// using middleware for protecting  routes
export function middleware(request: NextRequest) {
  //  request paths
  const path = request.nextUrl.pathname
  
  // check routes 
  const isPublicPath = path === '/login' || path === '/signup' 
   
  // get JWT token from brower local
  const token = request.cookies.get('token')?.value || ''

  // if user  login user can move home route
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
   // if user not login user can't move home route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }


}

export const config = {
    matcher: [
        '/login/:path*',
        '/',
        '/signup/:path*',
        '/profile/:path*',
    ],
  }