import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
