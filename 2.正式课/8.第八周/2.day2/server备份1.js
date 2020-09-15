
let http = require('http');
let url = require('url');
let path = require('path');
let { readFile } = require('./promiseFs');

let mime = require('mime');


let server = http.createServer((request, response) => {

  console.log(url);

  let { pathname, query } = url.parse(request.url, true); // 专门用来处理url
  // pathname // 当前请求的资源路径名称
  // query 请求的参数
  console.log(pathname); // '/index.html'
  pathname = path.resolve('./static') + pathname;// '....../222/static/'
  readFile(pathname).then(result => {
    // 给服务器返回的数据格式一般是buffer文件流或者是字符串

    // 发送响应头
    //  response.writeHead设置当前响应头的返回内容
    response.writeHead(200, {
      // 告诉客户端返回的HTTP的状态，
      // 200是返回给客户端的HTTP状态码
      // 'content-type':'text/html'
      // 告诉客户端返回的数据的编码格式，返回的格式类型是mime类型(每一个文件都自己对应的所属类型，而这个类型就是mime类型)

      // 告诉客户端服务器要给你什么格式的数据

      // text/plain
      // text/html
      // text/css
      // text/javascript
    });

    // response.write('1');
    // response.write('2');

    // 这是相当于基于响应体把内容返回给客户端
    // 服务端响应完成的标识就是end执行
    response.end('中国');
  }).catch((err) => {
    response.writeHead(404, {

    });

    response.end('not found!');
  });
})

server.listen(8080, () => {

  console.log('当前服务已经在8080端口上启动成功');
});


// console.log(mime.getType('js'));
// console.log(mime.getExtension('text/css'));