const path = require('path')
const {dev, build} = require('../config')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? build.assetsSubDirectory
    : dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
