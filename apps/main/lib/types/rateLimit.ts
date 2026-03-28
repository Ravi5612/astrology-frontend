export interface RateLimitOptions {
  /** Max requests allowed per window (default: 10) */
  limit?: number;
  /** Time window in ms (default: 60_000 = 1 minute) */
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until window resets
}

export interface WindowEntry {
  count: number;
  resetAt: number;
}
