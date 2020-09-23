#
1.每一次更改代码都得进行重新编译，而且还得在html页面中手动重新引入相对应的js文件(html-webpack-plugin可以帮助咱们自动引入需要的文件和把html进行编译)
2.咱们每一次重新打包之前，把之前打包的给删除掉
3.是否存在一个插件，可以帮咱们起一个服务，(以后不再使用open-with-live-server了)
  咱们自己启动的服务可以做：
    -->自动监听代码的改变，代码只要发生变化就会自动编译
    -->打动帮我们打开浏览器
    -->代码重新编译以后，浏览器页面上的效果也会自动刷新

    npm i html-webpack-plugin webpack-dev-server clean-webpack-plugin -D


# 配置dev-server、多入口和多出口
webpack-dev-server


//---------------------------------------------------------------------------------------
# 配置解析 less和css
// package.json中的browserslist数组里的意思是百分之九十九的浏览器要兼容到最后两个版本

mini-css-extract-plugin(抽离css但是不会压缩)
  terser-webpack-plugin、optimize-css-assets-webpack-plugin(第一个是压缩js的，第二个是压缩css的)

npm i mini-css-extract-plugin terser-webpack-plugin optimize-css-assets-webpack-plugin -D

  这里的postcss插件的使用要注意了，要在项目根目录下新创建一个postcss.config.js文件
  然后在package.json中加上一些信息才可以使用
  对应的网址：https://github.com/browserslist/browserslist