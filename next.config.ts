import type { NextConfig } from "next";

/*
 * Two build modes:
 *
 * 1. Default (sandbox/preview):  `bun run dev` / `bun run build`
 *    Uses the standalone output the preview environment expects.
 *
 * 2. Static export (GitHub Pages / Cloudflare Pages):
 *    `BUILD_STATIC=1 bun run build`
 *    Produces a pure static `out/` folder — no server needed.
 */
const isStatic = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        output: "standalone" as const,
      }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
