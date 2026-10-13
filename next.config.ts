import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site lives at manong.blotztask.com. The old Vercel address still serves
  // this same code, so anyone arriving there is sent on to the same page.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "manong-dev.vercel.app" }],
        destination: "https://manong.blotztask.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
