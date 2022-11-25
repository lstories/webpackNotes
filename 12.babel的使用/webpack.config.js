// node.js核心模块, 专门来处理路径问题
const path = require("path");

// 引入ESlint
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
  // 入口
  entry: "./src/main.js",  // 相对路径
  // 输出
  output: {
    // 文件输出路径
    // __dirname node.js的变量, 代表当前文件的文件夹目录
    path: path.resolve(__dirname, "dist"),  // 绝对路径
    // 入口文件打包输出文件名
    filename: "static/js/main.js",
    // 自动清空上次打包的结果
    // 原理: 在打包前, 将path整个目录内容清空, 再进行打包
    clean: true,

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
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 优点， 减少请求数量，缺点，体积会更大
            maxSize:10*1024, // 4kb
          }
        },
        generator: {
          // 输出图片名称
          // [hash:10] hash值取前10位
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|mp(3|4)|avi)$/,
        type: "asset/resource",
        generator: {
          // 输出图片名称
          // [hash:10] hash值取前10位
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不作处理)
        use: {
          loader: 'babel-loader',
          // options写在 babel.config.js中, 解耦
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },

    ],
  },
  // 插件
  plugins: [
    // plugin的配置
    new ESLintPlugin({
      // 检查那些文件
      context: path.resolve(__dirname, "src"),
    }),
  ],
  // 模式
  mode: "development",
};
