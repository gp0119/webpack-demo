const path = require('path')
const {dev, build} = require('../config')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? build.assetsSubDirectory
    : dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getIPAddress = function (){
  const interfaces = require('os').networkInterfaces();
  for(let devName in interfaces){
    const iface = interfaces[devName];
    for(let i=0;i<iface.length;i++){
      let alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
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
