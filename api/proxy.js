const util = require('util');

// 用 Object.assign() 覆盖 util._extend 方法
if (!util._extend) {
  util._extend = function(target, ...sources) {
    return Object.assign(target, ...sources);
  };
}

const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

http.Server.prototype.setMaxListeners(20);

module.exports = (req, res) => {
  const target = "https://www.google.com/"; 

  createProxyMiddleware({
    target,
    changeOrigin: true,
    // 新增：处理代理响应，解决渲染拦截问题
    onProxyRes: (proxyRes, req, res) => {
      // 1. 清除阻止页面渲染的响应头
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
      // 2. 确保响应编码正确（避免乱码导致渲染卡住）
      proxyRes.headers['content-type'] = proxyRes.headers['content-type'] || 'text/html; charset=utf-8';
    },
    // 新增：处理二进制资源（如图片）加载
    selfHandleResponse: false, // 保持默认，确保图片、JS等资源正常转发
    headers: {
      "User-Agent": req.headers["user-agent"],
      "Referer": "https://www.google.com/"
    }
  })(req, res);
};
