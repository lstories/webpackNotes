// node.js核心模块, 专门来处理路径问题
const path = require("path");
const os = require("os");

// 引入ESlint
const ESLintPlugin = require("eslint-webpack-plugin");
// 引入HtmlWebpack插件, 该插件将为你生成一个 HTML5 文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入MintCss插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入压缩css的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 引入压缩js的插件
const TerserWebpackPlugin = require("terser-webpack-plugin");
const threads = os.cpus().length; // cpu核数

// 用来获取处理样式的loader
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader, // 将js中的css通过创建style标签添加到html文件中生效
    // 命令npm install -save-dev css-loader
    "css-loader", // 将css资源编译成common.js的模块到js中
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 文件输出路径
    // __dirname node.js的变量, 代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"), // 绝对路径
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
        oneOf: [
          {
            test: /\.css$/, // 正则表达式, 只检测.css文件
            use: getStyleLoader(), // 调用封装函数
          },
          {
            test: /\.less$/,
            // loader: "xxx", // 只能使用1个loader
            use: getStyleLoader("less-loader"), // 调用封装函数
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader("sass-loader"), // 调用封装函数
          },
          {
            test: /\.styl$/,
            use: getStyleLoader("stylus-loader"), // 调用封装函数
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                // 小于10kb的图片转base64
                // 优点， 减少请求数量，缺点，体积会更大
                maxSize: 10 * 1024, // 4kb
              },
            },
            generator: {
              // 输出图片名称
              // [hash:10] hash值取前10位
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff|woff2|mp(3|4)|avi)$/,
            type: "asset/resource",
            generator: {
              // 输出图片名称
              // [hash:10] hash值取前10位
              filename: "static/media/[hash:10][ext][query]",
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/,  // 排除node_modules中的js文件(这些文件不作处理)
            include: path.resolve(__dirname, "../src"),
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  works: threads, // 进程数量
                },
              },
              {
                loader: "babel-loader",
                // options写在 babel.config.js中, 解耦
                options: {
                  // presets: ['@babel/preset-env']
                  cacheCompression: false, // 关闭缓存文件压缩
                  cacheDirectory: true, // 开启babel缓存
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积

                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    // plugin的配置
    new ESLintPlugin({
      // 检查那些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
      threads, // 开启多进程数量
    }),
    // html的配置
    new HtmlWebpackPlugin({
      // 模板: 以public/index.html文件创建新的html文件
      // 新的html文件特点, 1. 结构和原来一致  2. 自动引入打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // css的配置
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    // new CssMinimizerPlugin(),
    // new TerserWebpackPlugin({
    //   parallel: threads, // 开启多进程数量
    // }),
  ],

  optimization: {
    minimizer: [
      // 压缩CSS
      new CssMinimizerPlugin(),
      // 压缩JS
      new TerserWebpackPlugin({
        parallel: threads, // 开启多进程和设置进程数量
      }),
    ],
  },

  //警告 webpack 的性能提示
  performance: {
    hints: "warning",
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },

  // 模式
  mode: "production",
  // devtool
  devtool: "source-map",
};
