/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/artisan-storefront",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
