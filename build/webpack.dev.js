const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const { appDist, appSrc } = require("./path.js");

module.exports = merge(base, {
  // 开发模式
  mode: 'development',
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [appSrc],
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        }
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [appSrc],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
    ]
  },
  devServer: {
    port: 8080,
    client: {
      progress: true, // 显示打包的进度条
    },
    static: appDist, // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
    open: false, // 自动打开浏览器
    compress: true // 启动 gzip 压缩
  },
})
