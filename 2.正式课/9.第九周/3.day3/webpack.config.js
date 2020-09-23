
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');





let htmlPlugins = ['index', 'login'].map(item => {
  return new HtmlWebpackPlugin({
            template: `./public/${item}.html`,
            filename: `${item}.html`,
            hash: true,
            chunks: ['jquery',item], // 控制当前html模板里引入的js文件
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeAttributeQuotes: true,
              removeEmptyAttributes: true
            }
          })
})
module.exports = {
  mode: 'production', // development
  // entry: './src/main.js',
  entry: {
    index: './src/main.js',
    login: './src/login.js',
    jquery:'jquery'
  },
  output: {
    // name就是代表的上边entry中的属性名
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 配置dev-server把编译之后的结果放到计算机的内存里了，并不会和之前的webpack命令一样，把编译后的东西放到dist文件夹下，因为dev-server就是在你开发的时候使用的，就是方便你开发的，当咱们开发完成，要上线的时候，再去生成dist包把它上线
  devServer: {
    // 这里会利用node起一个web服务
    port: 3000, // 监听的端口号
    compress: true, // 开起GZIP
    contentBase: path.resolve(__dirname, 'dist'), // 指定的资源访问路径
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    // proxy:{
    //   '/':'http://127.0.0.1:8888'
    // }
  },
  // 设置优化项
  optimization:{
    // 设置压缩方式
    minimizer:[
      new OptimizeCssAssetsWebpackPlugin(), // 压缩css的
      new TerserWebpackPlugin() // 压缩js的
    ]
  },
  // 在 webpack中使用插件
  plugins: [

    ...htmlPlugins,
    // 分离css文件的，并且配置生成的css文件名字
    new MiniCssExtractPlugin({
      filename:'[name].[hash].min.css'
    }),
    new CleanWebpackPlugin()
  ],
  // 在webpack中使用loader加载器
  // 设置规则的处理方案，是从右往左，从下往上解析的
  module:{
      rules:[
        {
          test: /\.(less|css)$/i,
          use:[
            MiniCssExtractPlugin.loader,
              // "style-loader", // 把处理好的css内嵌到页面里(style)
              "css-loader", // 处理@import 、url这种语法的
              "postcss-loader", // 设置css前缀(处理兼容，需要搭配autoprefixer一起使用，还得进行额外的配置)
              "less-loader" // 把less文件里的内容编译成css
          ]
        }
      ]
  }
}