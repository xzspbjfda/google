const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require('http');

// 保留监听器数量配置，避免之前的警告
http.Server.prototype.setMaxListeners(20);

module.exports = (req, res) => {
  // 核心：代理目标设为谷歌（www.google.com），接收gg.sompay.cn的转发请求
  const target = "https://www.google.com/"; 

  createProxyMiddleware({
    target, // 所有gg.sompay.cn的请求最终转发到谷歌
    changeOrigin: true, // 关键：让谷歌服务器识别请求来自合法域名（避免域名校验拦截）
    pathRewrite: {
      // 若用户访问gg.sompay.cn/search?q=xxx，需确保转发到谷歌的/search路径
      // 若自定义域名的路径与谷歌一致（均为/search），无需额外重写；
      // 若自定义域名用其他路径（如/gg-search），需配置："^/gg-search": "/search"
    },
    // 传递请求头，模拟正常谷歌访问（提升兼容性，避免被识别为异常请求）
    headers: {
      "User-Agent": req.headers["user-agent"], // 传递客户端设备信息
      "Referer": "https://www.google.com/" // 让谷歌识别请求来源为自身域名
    }
  })(req, res);
};
