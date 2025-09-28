// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const util = require('util');
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

// 解决 util._extend 弃用警告
util._extend = function(target, ...sources) {
  return Object.assign(target, ...sources);
};

// 调整监听器数量限制
http.Server.prototype.setMaxListeners(20);

export default function handler(req, res) {
  // 目标代理地址（谷歌搜索）
  const target = "https://www.google.com/";

  // 创建并使用代理中间件
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
      // 移除限制跨域渲染的响应头
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
    },
    headers: {
      "User-Agent": req.headers["user-agent"],
      "Referer": "https://www.google.com/"
    }
  })(req, res);
}
    
