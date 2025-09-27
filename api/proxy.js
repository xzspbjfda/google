const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

// 调整EventEmitter监听器最大数量
http.Server.prototype.setMaxListeners(20); // 可根据实际场景调整数值

module.exports = (req, res) => {
  let target = "https://www.google.com/"; // 目标代理地址，可根据需求修改
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 若有路径重写需求可在此配置，如 "^/custom-path/": "/"
      "^/custom-path/": "/"
    },
  })(req, res);
};
