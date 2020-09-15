let express = require('express');
// 这是基于node开发的一款框架

// 这两部相当于创建了一个web服务，监听端口号
let app = express();
app.listen(8080,()=>{
  console.log('当前8080端口已经启动了服务');
});


// 静态资源文件请求
// express.static('path') 到指定的目录中查找对应的静态资源文件内容，并且将其返回给客户端
app.use(express.static('./static'));

app.use((req,res,next)=>{
    // 执行express.static('path')没有找到对应的资源文件，这里就会执行，做页面404的处理
    // res.status(404);
    // res.send('not found');

    // // 如果页面错了，咱们还可以进行重定向
    // res.redirect(301,'http://www.zhufengpeixun.com');
});

/* 
req对象
req.path:存储的请求地址的路径名称
req.query:存储的问号传参的信息(默认就是对象)
req.body:在配合中间件body-parser使用，存储的是通过请求主体传递过来的内容
req.method:请求方式
req.get:请求头的信息

res对象
res.end ：类似于原生的操作，结束当前次响应并且返回内容
res.json:返回给客户端内容，但是他可以传递JSON格式的对象(框架内部会帮咱们把对象转化成JSON格式的字符串)
res.type: 返回的content-type的类型值
res.send:最常用的给客户端返回信息的方法(传对象，PATH，BUFFER，TXT),基于响应主体把内容传递给客户端
res.status:返回的状态码
res.set:设置响应头   res.set('key','value')  res.set({'key','value',....})
res.redirect:重定向
*/







