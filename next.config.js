/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/artisan-storefront",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;