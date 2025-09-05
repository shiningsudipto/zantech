import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zantechbackend.desklago.com",
        port: "",
        pathname: "/public/product_image/**",
      },
    ],
  },
};

export default nextConfig;
