import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes: true,
  // experimental:{
  //   serverActions:true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "zantechbackend.desklago.com",
        port: "",
        pathname: "/public/product_image/**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // when frontend calls /api/anything
  //       destination: "https://zantechbackend.desklago.com", // proxy to backend
  //     },
  //   ];
  // },
};

export default nextConfig;
