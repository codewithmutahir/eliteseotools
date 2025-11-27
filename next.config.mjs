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
  // Turbopack config (Next.js 16 uses Turbopack by default)
  turbopack: {
    // Empty config to silence warning - webpack config will be used when needed
  },
  // Webpack config for canvas (optional dependency) and pdfjs-dist
  // This will be used when running with --webpack flag or in production
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
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

