/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Server components external packages (native modules)
  serverExternalPackages: ['better-sqlite3', 'canvas'],
  // Empty turbopack config to silence warning (we're using webpack)
  turbopack: {},
  // Webpack config for handling native modules and pdfjs-dist
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
        'better-sqlite3': 'commonjs better-sqlite3',
      });
    }
    // Client-side: webpack will resolve pdfjs-dist automatically
    // No need for explicit alias as webpack handles it correctly
    return config;
  },
}

export default nextConfig

