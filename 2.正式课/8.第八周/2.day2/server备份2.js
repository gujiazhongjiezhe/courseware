
let http = require('http');
let url = require('url');
let path = require('path');
let { readFile } = require('./promiseFs');

let mime = require('mime');

let server = http.createServer((request, response) => {



  let { pathname, query } = url.parse(request.url, true);
  pathname = path.resolve('./static') + pathname;
  let suffixReg = /\.([0-9a-zA-Z]+)$/;
  let encoding = '';
  let encodReg = /^(MP3|MP4|JPEG|JPG|SVG|PNG)$/i;
  let suffix = suffixReg.exec(pathname) ? suffixReg.exec(pathname)[1]: null;
  // 在项目中，一般我们会认为带后缀名的请求就是静态资源文件请求(web服务器处理)，没有后缀名的请求就是数据请求(数据服务器处理 API接口)
  if(suffix !==null){ // 说明有后缀
    // 这里就是静态资源文件请求
    encodReg.test(suffix) ? null :encoding = 'charset=utf8;';
    suffix = mime.getType(suffix);
    readFile(pathname).then(result => {

      response.writeHead(200, {
          'content-type':`${suffix};${encoding}`
      });
  
     
      response.end(result); // 这句话写完之后就相当于这个响应已经结束
    }).catch((err) => {
      response.writeHead(404, {
        'content-type':'application/json;charset=utf8;'
      });
  
      response.end('not中国 found!');
    });
  }



});

server.listen(8080, () => {

  console.log('当前服务已经在8080端口上启动成功');
});


// console.log(mime.getType('js'));
// console.log(mime.getExtension('text/css'));