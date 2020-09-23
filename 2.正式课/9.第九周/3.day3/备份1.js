// webpack是基于node开发的，这里的导入和导出遵循CommonJS规范
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode: 'production', // development
  entry: './src/main.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 在 webpack中使用插件
  plugins: [
    // 配置指定的html页面模板(后期在模板编译的时候，会自动把编译好的资源文件导入到我们的页面模板中)
    new HtmlWebpackPlugin({
      // 模板的路径
      template: './public/index.html',
      // 编译之后生成的文件的名字
      filename: 'index1.html',
      // 控制的是编译后html文件如何处理
      hash:true, // 是否在资源文件名称后设置hash值(清除强缓存用的和output中的hash是一样的，设置一个就行)
      minify: {
        collapseWhitespace: true, // 把标签之间的空格去掉
        removeComments: true, // 去掉注释
        removeAttributeQuotes: true, // 把属性的双引号去掉
        removeEmptyAttributes: true // 去掉行间的空属性
      }
    }),
    // 在每一次生成新的资源文件的时候，上一次的会被删除
    new CleanWebpackPlugin()
  ]
}