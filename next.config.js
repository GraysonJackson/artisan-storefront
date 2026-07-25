/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "artisan-storefront";

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig