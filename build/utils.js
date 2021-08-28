const path = require('path')
const {dev, build} = require('../config')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? build.assetsSubDirectory
    : dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cdnLoader = (prod = false) => {
  return {
    modules: [
      {
        name: 'lodash',
        var: '_',
        path: 'lodash.min.js'
      },
      // {
      //   name: 'axios',
      //   var: 'axios',
      //   path: 'axios.min.js'
      // },
      // {
      //   name: 'vue',
      //   var: 'Vue',
      //   path: 'vue.runtime.min.js'
      //   // path: 'dist/vue.runtime.min.js'
      // },
      // {
      //   name: 'vue-router',
      //   var: 'VueRouter',
      //   path: 'vue-router.min.js'
      // },
      // {
      //   name: 'echarts',
      //   var: 'echarts',
      //   path: 'echarts.min.js'
      // },
    ],
    prod,
    publicPath: '/node_modules',
    prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
  }
}
