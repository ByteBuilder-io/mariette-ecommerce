/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["links.papareact.com"],
  },
  target: "serverless",
};

module.exports = nextConfig;
