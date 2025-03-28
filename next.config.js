/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports
  output: 'export',
  // Configure base path for GitHub Pages (your-username/your-repo-name)
  // Only apply base path when DEPLOY_ENV is set to 'gh-pages'
  basePath: process.env.DEPLOY_ENV === 'gh-pages' ? '/tech-blog-md-viewer' : '',
  // Disable image optimization since it's not supported in static exports
  images: {
    unoptimized: true,
  },
  // This allows us to use the public directory for static assets
  // like images and videos
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;