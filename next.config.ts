import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production build (only the files next start actually needs),
  // copied into the runtime stage of the Dockerfile instead of the whole node_modules tree.
  output: "standalone",
};

export default nextConfig;
