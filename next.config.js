/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff(2)?|eot|ttf|otf|)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
      include: path.resolve(__dirname, "public/fonts"),
      generator: {
        filename: "static/fonts/[hash][ext][query]",
      },
    });
    return config;
  },
};

module.exports = nextConfig;
