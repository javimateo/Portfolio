import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production build (only the files next start actually needs),
  // copied into the runtime stage of the Dockerfile instead of the whole node_modules tree.
  output: "standalone",
  images: {
    // Images in public/ are already exported at the size they're shown (WebP, a few dozen
    // KB each), so they're served as-is. Next's on-the-fly optimiser (sharp) would add
    // ~100–250 MB of RAM to the server for no visible gain.
    unoptimized: true,
  },
  experimental: {
    // The VPS builds next to other running services: one worker for page generation
    // keeps the build's peak memory low (there are only a handful of pages anyway).
    cpus: 1,
  },
};

export default nextConfig;
