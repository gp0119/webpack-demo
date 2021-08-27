const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const { appDist } = require("./path.js");

module.exports = merge(base, {
  // 生产模式
  mode: 'production',
  // 输出
  //生产环境的 output 需要通过 contenthash 值来区分版本和变动，可达到清缓存的效果，而本地环境为了构建效率，则不引人 contenthash。
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: '[name].[contenthash].bundle.js',
    // bundle 文件路径
    path: appDist,
    // 编译前清除目录
    clean: true
  },
})
