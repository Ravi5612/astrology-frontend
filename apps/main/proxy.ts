import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
  iat?: number;
  userId?: number;
  role?: string;
}

const debug = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[AuthDebug][proxy]", ...args);
  }
};

// ─── Rate Limiter Store ───────────────────────────────────────────────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, resetIn: Math.ceil(windowMs / 1000) };
  }

  if (entry.count >= limit) {
    return { allowed: false, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
}

// ─── Constants & Rules ────────────────────────────────────────────────────────
const RATE_LIMIT_RULES: { path: string; limit: number; windowMs: number }[] = [
  { path: "/api/v1/auth/login",            limit: 5,  windowMs: 60_000 },
  { path: "/api/v1/auth/register",         limit: 5,  windowMs: 60_000 },
  { path: "/api/v1/auth/forgot/password",  limit: 3,  windowMs: 60_000 },
  { path: "/api/v1/auth/refresh",          limit: 10, windowMs: 60_000 },
  { path: "/api/v1/auth/logout",           limit: 10, windowMs: 60_000 },
  { path: "/api/v1/client/profile/phone/send-otp",   limit: 3, windowMs: 60_000 },
  { path: "/api/v1/client/profile/phone/verify-otp", limit: 5, windowMs: 60_000 },
];

const protectedPaths = [
  "/profile",
  "/wallet",
  "/settings",
  "/session-history",
  "/user-detail-form",
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const isAccessTokenValid = (accessToken?: string) => {
  if (!accessToken) return false;
  try {
    const payload = jwtDecode<JwtPayload>(accessToken);
    if (payload?.exp) {
      return payload.exp * 1000 > Date.now();
    }
    return false;
  } catch {
    return false;
  }
};

const buildSignInUrl = (
  request: NextRequest,
  callbackUrl: string,
  extras?: Record<string, string>,
) => {
  const loginUrl = new URL("/sign-in", request.url);
  loginUrl.searchParams.set("callbackUrl", callbackUrl);
  if (extras) {
    for (const [key, value] of Object.entries(extras)) {
      loginUrl.searchParams.set(key, value);
    }
  }
  return loginUrl;
};

// ─── Main Proxy Function ──────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 1. Rate limiting
  const rule = RATE_LIMIT_RULES.find((r) => pathname === r.path || pathname.startsWith(r.path));
  if (rule) {
    const key = `${ip}:${pathname}`;
    const result = rateLimit(key, rule.limit, rule.windowMs);

    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down and try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(result.resetIn),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // 2. Auth Evaluation
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken && isAccessTokenValid(accessToken)) {
    // Optional role-based routing could go here
    return NextResponse.next();
  }

  if (!refreshToken) {
    const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));
    if (isProtectedRoute) {
      return NextResponse.redirect(buildSignInUrl(request, pathname));
    }
    return NextResponse.next();
  }

  // 3. Handle Social Login Callback (Failure)
  const googleError = searchParams.get("error");
  const googleErrorDescription = searchParams.get("error_description");

  if (googleError) {
    debug("social login error found, redirecting to sign-in");
    const loginUrl = buildSignInUrl(request, pathname, {
      error: googleError,
      ...(googleErrorDescription ? { error_description: googleErrorDescription } : {}),
    });
    return NextResponse.redirect(loginUrl);
  }

  // 4. Protection and Refresh Logic
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    if (!refreshRes.ok) {
      return NextResponse.redirect(buildSignInUrl(request, pathname));
    }

    const response = NextResponse.next();
    const setCookieHeader = refreshRes.headers.get("set-cookie");
    if (setCookieHeader) {
      response.headers.set("set-cookie", setCookieHeader);
    }
    return response;
  } catch (error) {
    debug("refresh exception", error);
    return NextResponse.redirect(buildSignInUrl(request, pathname));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)", "/api/v1/auth/:path*", "/api/v1/client/profile/phone/:path*"],
};
