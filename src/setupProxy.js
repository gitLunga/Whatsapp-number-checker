const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // You'll need to prefix your API calls with /api
    createProxyMiddleware({
      target: 'https://api.p.2chat.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/open/whatsapp' // Rewrites /api to /open/whatsapp
      },
      headers: {
        'X-User-API-Key': process.env.REACT_APP_API_KEY
      }
    })
  );
};