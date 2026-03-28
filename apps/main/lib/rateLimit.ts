/**
 * lib/rateLimit.ts — In-memory rate limiter for Next.js API routes
 *
 * Usage:
 *   const limiter = createRateLimiter({ limit: 10, windowMs: 60_000 });
 *   const result = limiter(request);
 *   if (!result.success) return rateLimitResponse(result);
 */

import { NextRequest, NextResponse } from "next/server";
import type { RateLimitOptions, RateLimitResult, WindowEntry } from "./types/rateLimit";

/**
 * Creates a rate limiter function.
 * Each call returns a new limiter with its own tracking Map.
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 60_000;

  // In-memory store: IP → { count, resetAt }
  const store = new Map<string, WindowEntry>();

  // Cleanup old entries every 5 minutes to prevent memory leak
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of store.entries()) {
        if (now > entry.resetAt) store.delete(key);
      }
    }, 5 * 60 * 1000);
  }

  return function check(request: NextRequest | Request): RateLimitResult {
    const ip =
      (request as NextRequest).headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      (request as NextRequest).headers?.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
      // New window
      store.set(ip, { count: 1, resetAt: now + windowMs });
      return { success: true, remaining: limit - 1, resetIn: Math.ceil(windowMs / 1000) };
    }

    if (entry.count >= limit) {
      const resetIn = Math.ceil((entry.resetAt - now) / 1000);
      return { success: false, remaining: 0, resetIn };
    }

    entry.count += 1;
    return { success: true, remaining: limit - entry.count, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
  };
}

/**
 * Returns a standard 429 response with rate limit headers.
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please slow down and try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.resetIn),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(result.resetIn),
      },
    }
  );
}

// ─── Pre-built limiters (shared across requests in the same process) ──────────

/** For paid Prokerala API routes — 10 requests per minute per IP */
export const prokeralaLimiter = createRateLimiter({ limit: 10, windowMs: 60_000 });

/** For auth routes — 20 requests per minute per IP */
export const authLimiter = createRateLimiter({ limit: 20, windowMs: 60_000 });
