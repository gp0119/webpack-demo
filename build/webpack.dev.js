const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const { dev } = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const utils = require('./utils.js')

let devCongig = merge(base, {
  mode: 'development',
  devtool: dev.devtool,
  devServer: {
    host: dev.host,
    port: 'auto',
    proxy: dev.proxy,
    client: {
      logging: dev.logging,
      overlay: dev.errorOverlay,
    },
    static: {
      directory: dev.static,
      publicPath: dev.assetsPublicPath,
    },
    open: dev.autoOpenBrowser,
    compress: dev.compress,
    hot: true,
  },
  stats: {
    // 是否展示资源信息
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: false,
  }
})

if (dev.isNeedSpeed) {
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
  const smp = new SpeedMeasurePlugin();
  devCongig = smp.wrap(devCongig)
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = dev.port
      // add port to devServer config
      devCongig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devCongig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here:
  - Local:   http://localhost:${port}/
  - Network: http://${utils.getIPAddress()}:${port}/
           `
          ],
        },
        onErrors: dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devCongig)
    }
  })
})
