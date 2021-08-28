const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const { dev } = require('../config')

module.exports = merge(base, {
  mode: 'development',
  devtool: dev.devtool,
  devServer: {
    host: dev.host,
    port: dev.port,
    proxy: dev.proxy,
    client: {
      logging: dev.logging,
      overlay: dev.errorOverlay,
    },
    static: {
      directory: dev.static,
      publicPath: dev.publicPath,
    },
    open: dev.autoOpenBrowser,
    compress: dev.compress,
    hot: true,
  },
})
