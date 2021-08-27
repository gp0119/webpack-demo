const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口
  entry: {
    index: './src/index.js',
  },
  plugins: [
    // 以 public 下 index.html 为模板生成 html,自动引入 bundle
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
}
