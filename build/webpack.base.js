const HtmlWebpackPlugin = require("html-webpack-plugin");
const { appSrc } = require("./path.js");

module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: appSrc,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /.(scss|sass)$/,
        include: appSrc,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/i,
        loader: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    // 以 public 下 index.html 为模板生成 html,自动引入 bundle
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
}
