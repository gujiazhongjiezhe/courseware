### 项目目录
|- src 存储的是我们开发项目的时候的源文件
  |- assets 存放的是项目的静态的资源
      - xxx.png
      - xxx.css
      - xxx.js
  |- App.vue 项目的入口文件
  |- main.js webapck打包编译的入口的文件


  |- components 存放的是项目公共的组件
  |- store 这里存放的是项目的状态工具
  |- router 这里存放的是路由
  |- views 存放的是页面级的组件

|- public 存放的是当前的主页面的html模板(通过webpack解析，把打包好的css、js统统引入到当前html模板中，最后vue生成的视图会在html模板中的#app中进行渲染)
|- .gitignore 在git提交的可以忽略指定的目录或者文件


vue-cli 里的一些命令
  vue create 项目名字
  vue ui 通过页面选择的方法创建项目
  vue  inspect
  
  