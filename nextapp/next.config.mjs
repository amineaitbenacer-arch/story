/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images from /public folder (default)
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Compress output
  compress: true,
  // Power off powered by header
  poweredByHeader: false,
};

export default nextConfig;
