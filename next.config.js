/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["links.papareact.com"],
  },
  serverRuntimeConfig: {
    disableServerSideCookies: true,
  },
  productionBrowserSourceMaps: true,
  previewMode: true,
};

module.exports = nextConfig;
