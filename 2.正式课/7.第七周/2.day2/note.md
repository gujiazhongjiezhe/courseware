项目的目录结构
  |- admin 这是我们的后台代码(存储的是咱们后台的程序)
  |- client 这是咱们前端写的代码(前端的程序)

  admin
    > 跑环境 npm i
    > config.js
      - PORT:后台程序部署的端口号
      - ALLOW_ORIGIN： 允许跨域请求的地址
    > 启动后台服务
      node server.js
       // 只要出现 THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：8888就成功了
       记住，服务启动了以后不要关闭，关闭之后你的服务就关闭了(如果想关的话是ctrl+c)

       利用open with live server起一个前端的服务，然后要把admin的config的ALLOW_ORIGIN的值改为前端页面的域名和端口号
  
  客户端需要用到的技术栈
    - HTML5/CSS3(字体图标)
    - JQUERY
    - AXIOS
    - 辅助行的插件 JQUERY.COOKIE  MD5  / 自己写的一些方法
    - 基于IFRAME侯建一个最初始版本的SPA单页面应用

  服务器使用的到技术栈
    - NODE
    - EXPRESS 、EXPRESS-ROUTER
    - SESSION
    - 把当前项目的数据临时存储到json文件中


    -----------------------------------------------------------
    本地存储  服务器存储
    > 本地存储 ：把信息存储在客户端
        - cookie
        - H5WebStorage : localStorage /  sessionStorage
        - 本地的数据库存储 IndexDB
        - 本地缓存存储 manifest
        ....
    > 服务器存储：把数据信息存储在服务器端
        - 数据库存储 MYSQL  MONGODB ORACLE
        - REDIS
        - SESSION
        MYSQL SQLSERVER  MONGGODB oracle
