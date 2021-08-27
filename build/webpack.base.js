const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { appSrc } = require("./path.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
}

const {
  isEnvDevelopment,
  isEnvProduction
} = ctx

module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  resolve: {
    alias: {
      '@': appSrc,
    },
    // extensions 表示需要解析的文件类型列表。在引入模块时可不带后缀
    // 根据项目中的文件类型，定义 extensions，以覆盖 webpack 默认的 extensions，加快解析速度。
    // 由于 webpack 的解析顺序是从左到右，因此要将使用频率高的文件类型放在左侧。
    // webpack5 开箱即用的持久缓存是比 dll 更优的解决方案
    // cache-loader 也不需要引入了，上面的 cache 已经帮助我们缓存了。
    extensions: [
      ".vue",
      ".js",
      ".json",
      ".jsx",
      ".tsx",
      ".ts",
      ".mjs",
      ".wasm",
    ],
    //modules 表示 webpack 解析模块时需要解析的目录。指定目录可缩小 webpack 解析范围，加快构建速度。
    modules: [
      'node_modules',
      appSrc,
    ],
    //如果项目不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false，减少解析工作量
    symlinks: false,
  },
  // 通过 cache: filesystem 可以将构建过程的 webpack 模板进行缓存，
  // 大幅提升二次构建速度、打包速度，当构建突然中断，二次进行构建时，
  // 可以直接从缓存中拉取，可提速 90% 左右。
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  // 通过 thread-loader 将耗时的 loader 放在一个独立的 worker 池中运行，加快 loader 构建速度。
  // 请仅在耗时的操作中使用此 loader！
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: appSrc,
        use: [
          'thread-loader',
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015'
            }
          }
        ],
      },
      {
        test: /\.css$/,
        include: appSrc,
        use: [
          'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          }, // 仅生产环境
          'css-loader',
        ].filter(Boolean),
      },
      {
        test: /\.s[ac]ss$/i,
        include: appSrc,
        use: [
          'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          }, // 仅生产环境
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ].filter(Boolean),
      },
      {
        test: /\.less$/i,
        include: appSrc,
        use: [
          'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          }, // 仅生产环境
          'css-loader',
          'postcss-loader',
          'less-loader',
        ].filter(Boolean),
      },
    ]
  },
  plugins: [
    // MiniCssExtractPlugin 插件将 CSS 提取到单独的文件中，
    // 为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 以 public 下 index.html 为模板生成 html,自动引入 bundle
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${ chalk.green.bold(':percent') } (:elapsed s)`
    })
  ]
}
