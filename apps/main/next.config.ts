import type { NextConfig } from "next";

// ─── Security Headers ──────────────────────────────────────────────────────────
const securityHeaders = [
  // Prevent clickjacking — page cannot be embedded in an iframe
  { key: "X-Frame-Options", value: "DENY" },

  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Referrer info — only send origin on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Disable browser features we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

  // HSTS — force HTTPS for 1 year (production only)
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),

  // ─── Content Security Policy ───────────────────────────────────────────────
  {
    key: "Content-Security-Policy",
    value: [
      // Default: only same origin
      "default-src 'self'",

      // Scripts: self + Razorpay + Google APIs + Bootstrap (inline eval for Next.js)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://cdn.razorpay.com https://www.googletagmanager.com",

      // Styles: self + inline (Tailwind/Bootstrap) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",

      // Fonts: self + Google Fonts + FontAwesome + data URIs (for embedded fonts in libs like Chart.js)
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",

      // Images: self + Cloudinary + Google OAuth + JD Magic Box + data URIs
      "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://content.jdmagicbox.com https://www.google.com",

      // API & WebSocket connections
      `connect-src 'self' https://checkout.razorpay.com https://*.twilio.com wss: ws: wss://*.twilio.com${process.env.NODE_ENV !== "production" ? " http://localhost:6543 http://127.0.0.1:6543" : ""}`,

      // Frames: Razorpay checkout iframe
      "frame-src https://api.razorpay.com https://checkout.razorpay.com",

      // Media - Twilio video/audio
      "media-src 'self' blob: https://*.twilio.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/ui", "@repo/routes", "swiper"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth profile pictures
      },
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
      },
    ],
  },
  // Move turbo rules here and rename to turbopack
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/buy-products",
        destination: "/product",
        permanent: true,
      },
      {
        source: "/buy-products/:path*",
        destination: "/product/:path*",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:6543").replace(/\/+$/, "").replace(/\/api\/v1\/?$/i, "");
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`, // Proxy to Backend
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`, // Proxy to Backend
      },
    ];
  },

  devIndicators: false,

  async headers() {
    return [
      {
        // Apply security headers to ALL routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;


