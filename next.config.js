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
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      include: path.resolve(__dirname, "src/fonts"),
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/fonts/",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
