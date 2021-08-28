const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {build} = require('../config')

const webpackConfig = merge(base, {
  mode: 'production',
  optimization: {
    // 通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    runtimeChunk: true,
    // 告知 webpack 当选择模块 id 时需要使用哪种算法
    // deterministic 选项有益于长期缓存，但对比于 hashed 来说，它会导致更小的文件 bundles。
    moduleIds: 'deterministic',
    minimizer: [
      // 使用 TerserWebpackPlugin 来压缩 JavaScript。
      // webpack v5 开箱即带有最新版本的 terser-webpack-plugin。
      // 如果你使用的是 webpack v5 或更高版本，同时希望自定义配置，
      // 那么仍需要安装 terser-webpack-plugin。
      // 如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本。
      // TerserWebpackPlugin 默认就开启了多进程和缓存，无需再引入 ParallelUglifyPlugin。
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      new CssMinimizerPlugin({
        parallel: 4,
      }),
      // `...`,
    ],
    // 抽离重复代码
    // webpack 将根据以下条件自动拆分 chunks：
    //
    // 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹；
    // 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）；
    // 当按需加载 chunks 时，并行请求的最大数量小于或等于 30；
    // 当加载初始化页面时，并发请求的最大数量小于或等于 30；
    // 注意：切记不要为 cacheGroups 定义固定的 name，
    // 因为 cacheGroups.name 指定字符串或始终返回相同字符串的函数时，
    // 会将所有常见模块和 vendor 合并为一个 chunk。
    // 这会导致更大的初始下载量并减慢页面加载速度。
    splitChunks: {
      chunks: 'all',
      // 重复打包问题
      cacheGroups:{
        vendors:{ // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          // 告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项，并始终为此缓存组创建 chunk。
          enforce: true
        }
      }
    },
  }
})

if (build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
