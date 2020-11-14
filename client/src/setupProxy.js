const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(createProxyMiddleware("/api/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:3001/",
    secure: false
  }));
};