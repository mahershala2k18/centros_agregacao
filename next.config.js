/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "https://odkmadico.terrafirma.co.mz",
        port: "444",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3020",
        pathname: "/v1/*/docs/*",
      },
      {
        protocol: "http",
        hostname: "cavateco.terrafirma.co.mz",
      },
    ],
  },
};

module.exports = nextConfig;
