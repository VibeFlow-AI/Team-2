import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// This is for Edge Runtime compatibility
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth/* (authentication routes)
     * 2. /api/webhooks/* (webhook routes)
     * 3. /_next/static (static files)
     * 4. /_next/image (image optimization files)
     * 5. /favicon.ico (favicon file)
     * 6. /public/* (public files)
     */
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

// Define paths that don't require authentication
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/register/student",
  "/register/mentor",
  "/api/auth/login",
  "/api/register/student",
  "/api/register/mentor",
];

const COOKIE_NAME = "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is public and allow access
  if (
    publicPaths.some((p) => path === p || path.startsWith(`${p}/`)) ||
    path.startsWith("/_next") ||
    path.startsWith("/public") ||
    path.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify token with jose (Edge Runtime compatible)
    const secretKey = new TextEncoder().encode(JWT_SECRET);

    const { payload } = await jwtVerify(token, secretKey);
    const userRole = payload.role as string;

    // Check user role for route access
    if (path.startsWith("/mentor-dashboard") && userRole !== "MENTOR") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path.startsWith("/student-dashboard") && userRole !== "STUDENT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    // If token is invalid or expired, redirect to login
    console.error("Authentication error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
