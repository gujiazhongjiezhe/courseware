module.exports = {
  // 选项...
  // process.env.NODE_ENV代表全局环境变量，如果是生活才能打包，那就是production
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // 自定义打包之后的文件夹的名称
  outputDir: 'build',
  // 自定义生成的静态资源的存放路径
  assetsDir: 'assets',
  // indexPath修改打包之后的html模板的名字

  productionSourceMap: false,
  // 在生产环境下，关闭xxx.js.map(map文件可以快速的定位到错误的位置)
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 4096*2
        return options
      })
  },
  devServer: {
    proxy: {
      '/': {
        changeOrigin: true,
        target:'http://www.baidu.com:4000'
      }
    }
  }
// '/api/list'
// '/credit/add'
}