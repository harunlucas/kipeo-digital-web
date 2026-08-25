import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Permanently send the old production Vercel alias to the canonical
      // domain. Scoped to that exact hostname via `has: [{ type: "host" }]`
      // so it never matches preview deployments (each gets its own
      // generated hostname) or the canonical domain itself — no loop risk.
      {
        source: "/:path*",
        has: [{ type: "host", value: "kipeo-digital-web.vercel.app" }],
        destination: "https://kipeo.harunlucas.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
