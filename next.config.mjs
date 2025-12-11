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
  // Empty turbopack config to silence warning (we're using webpack via --webpack flag)
  turbopack: {},
  // Webpack config for canvas (optional dependency) and pdfjs-dist
  // This will be used when running with --webpack flag or in production
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
        'better-sqlite3': 'commonjs better-sqlite3',
      });
    } else {
      // Client-side: ensure pdfjs-dist worker is handled correctly
      config.resolve.alias = {
        ...config.resolve.alias,
        'pdfjs-dist': require.resolve('pdfjs-dist'),
      };
    }
    return config;
  },
}

export default nextConfig

