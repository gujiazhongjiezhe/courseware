let express = require('express');
let { readFile } = require('./promiseFs');
let qs = require('qs');

let app = express();
app.listen(8080, () => {
  console.log('当前8080端口已经启动了服务');
});





//数据API请求的处理 app.get post delete head put
// 客户端请求地址： http://127.0.0.1:8080/list?lx=pro  GET请求，如果当前传参是pro，咱们就把package.json中的dependencies对象返回， 如果不传参，就把devDependencies对象返回
app.get('/list', (req, res) => {
  let { lx = '' } = req.query;
  readFile('./package.json').then((result) => {
    result = JSON.parse(result);
    result = (lx === 'pro' ? result.dependencies : result.devDependencies);
    // console.log(result);
    res.status(200);
    res.type('application/json');
    res.send(result);
  }).catch(err => {
    res.status(500);
    res.type('application/json');
    res.send('服务器未知的错误');
  })
});



// 模拟一个POST请求 客户端请求地址： http://127.0.0.1:8080/add
// 请求主体内容 name=1&age=2,服务器接收到请求之后，把当前请求主体的信息存储到本地AA.json文件中，返回给楼客户成功后者失败
// 如果存储成功 状态码是200，返回一个对象 code:0,codeText:'OK',
// 如果存储失败 状态码是200，返回一个对象 code:1,codeText:'xxxxx'

// post里接受数据太麻烦了，我们要用简单的方法把它进行处理
app.post('/add',(req,res)=>{
    let chunk = '';
    req.on('data',(chart)=>{
      chunk+=chart;
    });
    req.on('end',()=>{
      // console.log(chunk);
      // qs parse  stringify' 实现JSON对象和URLENCODED格式之间的转化
      console.log(qs.parse(chunk));
    })
})



app.use(express.static('./static'));
app.use((req, res, next) => {
  res.status(404);
  res.send('not found');
});










