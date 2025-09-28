/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 启用图像优化
  images: {
    domains: [], // 如需加载外部图片，添加对应域名
  },
  // 配置环境变量（可选）
  env: {
    PROXY_TARGET: process.env.PROXY_TARGET || "https://www.google.com/",
  },
  // 自定义构建输出目录
  distDir: 'build',
}

module.exports = nextConfig
