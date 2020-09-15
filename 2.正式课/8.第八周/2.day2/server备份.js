/* 
服务端要做的常规任务
1.不管服务器要干啥，必须得先有一个服务(创建服务：iis nginx...,node【http/https内置模块】)
2.接收客户端发送的请求(请求静态资源文件的，还有请求数据的)
3.查找到对应的资源或者文件，
4.给客户端响应回去
 */
let http = require('http');
let url = require('url');

// 利用http模块创建一个服务
let server = http.createServer((request,response)=>{
  // 当客户端向服务器发送请求的时候，就会触发此函数的执行，(请求几次他就触发几次)，而且每执行一次都能够获取到请求的相关信息
    // console.log(1);
    // request对象中存储的是客户端请求的一些信息
    // response提供了对应的属性和方法，可以让服务器返回给客户端某些信息
    response.end('123344');
});

server.listen(8080,()=>{
  // 当服务创建成功，并且端口号已经监听成功，此函数就会执行
  console.log('当前服务已经在8080端口上启动成功');
});