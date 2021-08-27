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
    })
  ]
}
