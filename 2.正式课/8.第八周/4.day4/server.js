let express = require('express');



// 创建一个web服务
let app = express();
app.listen(8080, () => {
  console.log('当前8080端口已经启动成功');
});

app.use((req, res, next) => {
  // 如果允许所有源，(不安全、不能携带凭证)
  // 单一源，(安全、可以携带凭证，只能是单一源)
  let url = req.headers.origin;
  console.log(url,15);
  let ary = ['http://127.0.0.1:5501','http://127.0.0.1:5500']; // 设置白名单
  
  let origin = 'http://127.0.0.1:8080';
  origin = ary.includes(url) ? url : origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With');
  res.header("Access-Control-Allow-Methods", 'PUT,POST,GET,DELETE,OPTIONS,HEAD');

  
  req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
  // next();
});

app.get('/list', (req, res) => {
  // let { callback } = req.query;
  // let re = `${callback}({code:0,codeText:'ok'})`;       //'get({code:0,codeText:ok})'
  // res.send(re)
  res.send({
    code:0,
    codeText:'ok'
  })
})


// 静态资源文件的请求处理
// app.use(express.static('./'));
app.use((req, res, next) => {
  res.status(404);
  res.send(`很抱歉，您请求的资源文件${req.path}不存在`)
});
