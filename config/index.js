const { appDist } = require("../build/path");

module.exports = {
  dev: {
    // 开发工具，开启 source map，编译调试
    devtool: 'eval-cheap-module-source-map',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为。
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    host: '0.0.0.0',
    port: 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: false,
    // 是否开启压缩
    compress: true,
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
    static: appDist,
    // 告诉服务器在哪个 URL 上提供 static.directory 的内容
    publicPath: '/',
    //
    // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
    logging: 'info',
    // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    errorOverlay: true,
  },
  build: {
    productionGzip: false,
  }
}
