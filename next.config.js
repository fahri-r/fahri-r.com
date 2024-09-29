/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fahri-r.notion.site", "lh3.googleusercontent.com", "www.notion.so"],
  },
  transpilePackages: ['lucide-react']
};

module.exports = nextConfig;
