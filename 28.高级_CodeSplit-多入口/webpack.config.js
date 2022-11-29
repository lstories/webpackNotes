const path = require("path");
// 引入HtmlWebpack插件, 该插件将为你生成一个 HTML5 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: '../src/main.js', // 只有一个入口文件, 单入口
  entry: {
    // 有多个入口文件, 多入口
    app: "./src/app.js",
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // webpack命名方式, [name]以文件名自己命名
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 模板: 以public/index.html文件创建新的html文件
      // 新的html文件特点, 1. 结构和原来一致  2. 自动引入打包输出的资源
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],

  // 模式
  mode: "production",
};
