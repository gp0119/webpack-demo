const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
}
