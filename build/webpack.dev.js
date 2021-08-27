const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const { appDist } = require("./path.js");

module.exports = merge(base, {
  // 开发模式
  mode: 'development',
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  // 输出
  // 生产环境的 output 需要通过 contenthash 值来区分版本和变动，可达到清缓存的效果，而本地环境为了构建效率，则不引人 contenthash。
  output: {
    // bundle 文件名称
    filename: '[name].bundle.js',
    // bundle 文件路径
    path: appDist,
    // 编译前清除目录
    clean: true
  },
  devServer: {
    port: 8080,
    client: {
      progress: true, // 显示打包的进度条
    },
    static: appDist, // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
    open: true, // 自动打开浏览器
    compress: true // 启动 gzip 压缩
  },
})
