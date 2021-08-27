const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { appSrc } = require("./path.js");

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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015'
        }
      },
      {
        test: /\.css$/,
        include: appSrc,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: appSrc,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/i,
        include: appSrc,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
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
