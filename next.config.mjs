/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
      allowedOrigins: [
        'localhost:3000',
        '*.github.dev',
        '*.githubpreview.dev',
        '*.preview.app.github.dev',
      ],
    },
  },
}

export default nextConfig
