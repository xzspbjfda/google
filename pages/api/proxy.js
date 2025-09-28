// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

// 调整监听器数量限制，避免过多连接时警告
http.Server.prototype.setMaxListeners(50);

export default function handler(req, res) {
  // 目标代理地址（可根据需求修改）
  const target = "https://www.google.com/";

  // 创建代理中间件并配置
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    // 支持WebSocket代理（如果目标网站需要）
    ws: true,
    // 移除限制跨域渲染的响应头
    onProxyRes: (proxyRes) => {
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
      delete proxyRes.headers['x-xss-protection'];
    },
    // 传递关键请求头，模拟真实浏览器请求
    headers: {
      "User-Agent": req.headers["user-agent"] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "Referer": target,
      "Accept-Language": req.headers["accept-language"] || "en-US,en;q=0.9"
    },
    // 路径重写规则（可选，根据需求添加）
    pathRewrite: {
      // 示例：将 /search 路径重写为目标的 /search
      // "^/search": "/search"
    }
  });

  return proxy(req, res);
}