/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',  // Proxy API requests to backend during development
      },
    ];
  },
};

module.exports = nextConfig;
