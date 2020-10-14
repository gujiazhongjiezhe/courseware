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

// 划分组件-->把组件先写出来(结构样式，在哪里引用)
// 组件的完善是从外往里一步一步进行
// (banner 先把用到的属性传递过去-->接收-->在mounted函数里写一个定时器，定时器里每隔一段时间去执行一个autoMove函数【autoMove函数放到methods里边】activeIndex)
// 

// vue-cli  vue create 