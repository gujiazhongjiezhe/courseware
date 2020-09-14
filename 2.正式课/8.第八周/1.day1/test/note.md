1.node做的一些事情
 ==>node也是基于v8引擎(webkit内核)去渲染和解析js代码，他是一个工具或者说是一个环境，咱们的node可以安装到服务器上，去让js在node总运行，从而进行对服务器中的逻辑的处理
 ==>在js在node中运行
    node xxx.js(当前打开的终端必须是当前项目的终端)
    node 回车，然后直接写代码

  npm是你安装node只有自己带的模块管理工具，基于他咱们可以对第三方的模块进行安装和卸载
  yarn
  npm i yarn -g 下载yarn
  npm i xxx
  yarn add xxx


  ======================================
  基于node实现服务端功能的操作
  基于node.js去构建一些中小型的全栈项目

  =====================================
  把node最为一个中间层来使用
  1.减小真正服务器的处理压力，而且还可以解决跨域的问题
  2.可以利用node写一些伪接口，(测试接口)方便你可以调试使用，如果调试的没有问题，这时候后台也写的差不多了，你就可以把请求的url换成后台给你的url，然后去请求后台的接口，看看通不通

  ### 
  node的特点：单线程 无阻塞I/O 事件驱动

  ### I/O
  > I:input:输入
  > O：output:输出
  I/O一般都是指对文件的读取操作

  js在浏览器中可以对本地的文件进行操作吗
    >这肯定是不可以的因为得保证客户的信息的安全，但是input元素的可以上传文件，但是得用户手动操作

### window && global
  1.js在客户端浏览器中运行会存在全局对象:window(给咱们提供了好多方法共咱们使用)

  2.在node中运行js，全局对象有，但是已经不是window了是global
    // 直接在终端里输出this是全局对象 global
        - process
          + process.env  node全局变量
    // 如果在模块(js文件)中输出，this是当前模块

  // 在package.json中的scripts中可以设置本地可执行的脚本命令 npm run xxx
  ```
   "scripts": {
     // =>set xxx=xxx 设置全局环境变量(MAC下使用 export xxx=xxx)
     // 当使用时，利用 process.env.xxx就可以拿到当前你设置的全局环境变量
    "test": "set NODE_EVN=12345&&node index.js";
    "dev": "set NODE_EVN=pro&&node index.js";
  }
  ```

  ### commonJs模块管理机制
> AMD: require.js
> CMD: sea.js
> CommonJS:node.js
> ES6 Moudle

> 这些都是模块化的思想。规定了在js中，我们该如何创建模块，以及模块的导入和导出

  > 内置模块
    + http/https 创建和管理服务的模块
    + fs 给予js进行文件I/O操作的模块
    + url：解析url的模块
    + path 管理路径的模块
  > 第三方的模块：基于npm下载的，获取安装的文件
    + mime
    + qs
    + express
    + express-session
    + body-parser
  > 自定义模块：自己写的js文件

  ### node中的模块管理
    1.在node环境下，我们每创建一个js文件，就是创建了一个模块，模块中的所有东西都是私有的东西，如果不同的模块之间有相同的名字，不会有任何冲突

    2.module.exports 是node天生用来导出模块的方法
    module.exports = {
      // 如果想让当前模块里的方法暴露给外边是使用，就得在此位置导出
      xxx:xxx
    }

    3.reuqire是node天生导入模块的方法
    let 模块名字 = require('模块地址'); // .js可以省略

      + 1、.js可以省略
      + 2、如果调用的是自己定义的模块，那引入的路径需要加(/)(./)(../)
      + 3、调用的时候如果不加上述地址 他会默认调用第三方模块，如果没有第三方模块，那就找node内置的模块，如果还没有，就报错

     let A = require('./A');
     let fs = require('fs');

    4.require导入是同步的(前边的没有导入完，后边的是不会导入的，后边的代码是不会走的)，而且每导入一次模块，导入的模块就会(从头到尾)执行一遍

### node中的内置模块fs
  >fs中内置了大量的方法供我们的js可以对本地的文件进行读写(I/O操作)
    - readdir  readdirSync 读取文件目录


let A = (function(){
  let a = 100;
  return {
    a:a
  }
})();

let B = (function(){
  let a = 100;
  console.log(B.a) 
})();


  



  