import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Redirect authenticated users away from the login page
    if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    // Require ADMIN role for all dashboard pages
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/404", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/admin/login',
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
