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
    console.log("[AuthDebug][middleware]", ...args);
  }
};

const protectedPaths = ["/profile", "/wallet", "/settings", "/session-history"];

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

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken && isAccessTokenValid(accessToken)) {

    let targetPath = pathname;
    let targetHost = request.nextUrl.origin;

    try {
      const payload = jwtDecode<JwtPayload>(accessToken);
      if (payload.role === "agent") {
        targetHost = process.env.ASTROLOGER_FRONTEND_URL || "http://localhost:3003";
        targetPath = "/dashboard";
      } else if (payload.role === "admin") {
        targetHost = process.env.ADMIN_FRONTEND_URL || "http://localhost:3001";
        targetPath = "/dashboard";
      }
    } catch (err) {
      debug("failed to decode urlAccessToken for role check", err);
    }

    return NextResponse.next();
  }

  if (!refreshToken) {
    let redirectURl = buildSignInUrl(request, pathname)

    NextResponse.redirect(redirectURl);
    return;
  }

  // 2. Handle Social Login Callback (Failure)
  const googleError = searchParams.get("error");
  const googleErrorDescription = searchParams.get("error_description");

  if (googleError) {
    debug("social login error found, redirecting to sign-in");
    const loginUrl = buildSignInUrl(request, pathname, {
      error: googleError,
      ...(googleErrorDescription ? { error_description: googleErrorDescription } : {}),
    });
    NextResponse.redirect(loginUrl);
    return;
  }

  debug("token evaluation", {
    path: pathname,
    hasAccessToken: Boolean(accessToken),
    hasRefreshToken: Boolean(refreshToken),
  });

  // 3. Protection and Refresh Logic
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

    debug("refresh response", {
      status: refreshRes.status,
      ok: refreshRes.ok,
    });

    if (!refreshRes.ok) {
      NextResponse.redirect(buildSignInUrl(request, pathname));
      return;
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
