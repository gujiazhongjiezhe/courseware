let express = require('express');
let { readFile } = require('./promiseFs');
let bodyParser = require('body-parser');
let session = require('express-session');

let { dataHandle } = require('./utils');


// 创建一个web服务
let app = express();
app.listen(8080, () => {
  console.log('当前8080端口已经启动成功');
});


// 把处理session的中间件设置上，req.session就可以操作session信息

app.use(session({
	secret: 'ZFPX',
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}
}));

app.use(bodyParser.urlencoded({
  extended:true
}));
// 我把JSON文件夹中的数据全部挂载到req上，这样以后我在使用数据的时候就好获取了
app.use((req, res,next) => {
  let path = './json'
  let p1 = readFile(path + '/user.json');
  let p2 = readFile(path + '/customer.json');
  let p3 = readFile(path + '/visit.json');
  let p4 = readFile(path + '/department.json');
  let p5 = readFile(path + '/job.json');
  Promise.all([p1, p2, p3, p4, p5]).then(result => {
    let [$USERDATA, $CUSTOMERDATA, $VISITDATA, $DEPARTMENTDATA, $JOBDATA] = result;
    req.$USERDATA = dataHandle($USERDATA);
    req.$CUSTOMERDATA = dataHandle($CUSTOMERDATA);
    req.$VISITDATA = dataHandle($VISITDATA);
    req.$DEPARTMENTDATA = dataHandle($DEPARTMENTDATA);
    req.$JOBDATA = dataHandle($JOBDATA);
    next(); // 写上之后代码才会往下走
  }).catch(err=>{
    res.status(500);
    res.send(err)
  })
});

// 构建EXPRESS路由
// '/user/login'
// 请求的API地址符合/xxx的。都会进入到指定的路由中
app.use('/user',require('./router/user'));
app.use('/department',require('./router/department'));
app.use('/job',require('./router/job'));
app.use('/customer',require('./router/customer'));
app.use('/visit',require('./router/visit'));






// 静态资源文件的请求处理
app.use(express.static('./client'));
app.use((req, res, next) => {
  res.status(404);
  res.send(`很抱歉，您请求的资源文件${req.path}不存在`)
});
