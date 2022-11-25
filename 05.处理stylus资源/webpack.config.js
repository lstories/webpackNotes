// node.js核心模块, 专门来处理路径问题
const path = require("path");

module.exports = {
  // 入口
  entry: "./src/main.js",  // 相对路径
  // 输出
  output: {
    // 文件输出路径
    // __dirname node.js的变量, 代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),  // 绝对路径
    // 文件名
    filename: "main.js",
  },
  // 加速器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,   // 正则表达式, 只检测.css文件
        use: [  // use的执行顺序, 右到左, 下到上
          // 命令npm install -save-dev style-loader
          "style-loader",   // 将js中的css通过创建style标签添加到html文件中生效
          // 命令npm install -save-dev css-loader
          "css-loader",  // 将css资源编译成common.js的模块到js中
        ],
      },
      {
        test: /\.less$/,
        // loader: "xxx", // 只能使用1个loader
        use: [
          // 命令npm install -save-dev style-loader
          "style-loader",   // 将js中的css通过创建style标签添加到html文件中生效
          // 命令npm install -save-dev css-loader
          "css-loader",  // 将css资源编译成common.js的模块到js中
          // 命令npm install less less-loader --save-dev
          "less-loader",  //将less资源编译成css文件
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 命令npm install sass-loader sass --D
          "style-loader",
          "css-loader",
          "sass-loader",  //将sass资源编译成css文件
        ]
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          // npm i stylus-loader -D
          "stylus-loader",  //将stylus资源编译成css文件
        ]
      },
    ],
  },
  // 插件
  plugins: [
    // plugin的配置
  ],
  // 模式
  mode: "development",
};
