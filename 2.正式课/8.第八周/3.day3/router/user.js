let express = require('express');
let route = express.Router();
let { writeFile } = require('../promiseFs');
let { md5Handle, success, queryJob, queryUser, queryDepartment } = require('../utils');

// 登录接口
route.post('/login', (req, res) => {
  console.log(6666);
  // 1.获取客户端传递进来的信息
  let { account, password } = req.body;
  // 2.把用户传递进来的密码进行二次加密
  password = md5Handle(password);
  // 3.进行用户名和密码的比对(到user列表中去查找符合账户密码的这一项)
  // find是发现，看看宿主中有么有符合规则的那一项，如果有，就立即把那一项返回出去，如果没有就是返回undefined
  let result = req.$USERDATA.find(item => {
    return password === item.password && (account === item.name || account === item.phone || account === item.email)
  });
  // 4.根据返回的不同result信息，去做不同的判断
  if (result) {
    // 如果能够走到这里就是登陆成功的
    //把登录成功的信息返回，还有把当前用户的权限power返回

    // 5.根据用户的jobId获取到job列表中的power信息(连表查询)
    let power = (queryJob(req, result.jobId) || {}).power || '';
    // 6.通过设置SESSION来保存登录状态
    req.session.userId = result.id;
    req.session.power = power;

    success(res, {
      power
    })
    return;
  }
  success(res, {
    code: 1,
    codeText: 'NO'
  });



});

// 校验登录状态
route.get('/login', (req, res) => {
  let userId = req.session.userId;
  if (userId) {
    success(res);
    return;
  }
  success(res, {
    code: 1,
    codeText: '不好意思，您还没有登录'
  })
});

// 获取员工详细信息
route.get('/info', (req, res) => {

  let { userId = req.session.userId } = req.query;
  let data = queryUser(req, userId) || {}; // 通过用户id得到用户信息
  data = { // 按照接口文档把用户信息进行处理
    id: data.id,
    name: data.name,
    sex: data.sex,
    email: data.email,
    phone: data.phone,
    departmentId: data.departmentId,
    department: (queryDepartment(req, data.departmentId) || {}).name || '',
    jobId: data.jobId,
    job: (queryJob(req, data.jobId) || {}).name || '',
    desc: data.desc
  };
  if (typeof data.id === 'undefined') {
    success(res, {
      code: 1,
      codeText: '不好意思，获取信息失败'
    });
    return;
  }

  success(res, {
    data
  });
});

// 退出接口
route.get('/signout', (req, res) => {
  req.session.userId = null;
  res.session.power = null;
  success(res);
});

// 获取员工列表
route.get('/list', (req, res) => {
  // 1.接收客户端传递的参数信息
  let { departmentId = 0, search = '' } = req.query;
  // 2.筛选出对应的信息

  // 按照部门进行过滤
  departmentId = parseFloat(departmentId);
  if (departmentId != 0) {
    req.$USERDATA = req.$USERDATA.filter(item => parseFloat(item.departmentId) === departmentId);
  }
  if (search !== '') {
    req.$USERDATA = req.$USERDATA.filter(item => {
      return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search)
    });
  }

  // 按照接口文档把用户信息进行处理
  req.$USERDATA = req.$USERDATA.map(item => {
    return {
      id: item.id,
      name: item.name,
      sex: item.sex,
      email: item.email,
      phone: item.phone,
      departmentId: item.departmentId,
      department: (queryDepartment(req, item.departmentId) || {}).name || '',
      jobId: item.jobId,
      job: (queryJob(req, item.jobId) || {}).name || '',
      desc: item.desc
    }
  });

  // 返回给客户端数据
  if (req.$USERDATA && req.$USERDATA.length === 0) {
    success(res, {
      code: 1,
      codeText: '暂无数据！'
    })
    return;
  };
  success(res, {
    data: req.$USERDATA
  });

});

// 删除员工列表
route.get('/delete', (req, res) => {
  // 删除接口是比较重要的接口
  let power = req.session.power;
  if (!power.includes('userhandle')) {
    res.status(401);
    res.send({
      code: 1,
      codeText: '不好意思，您没有操作权限'
    });
    return;
  }
  let { userId = 0 } = req.query;
  let flag = false;
  req.$USERDATA = req.$USERDATA.map(item => {
    if (item.id == userId) {
      flag = true;
      return {
        ...item,
        state: 1
      }
    }
    return item;
  });
  if (!flag) {
    success(res, {
      code: 1,
      codeText: '不好意思，删除失败'
    });
    return;
  }
  // 你需要把最新的数据写到json中
  writeFile('./json/user.json', req.$USERDATA).then(() => {
    success(res)
  }).catch(err => {
    success(res, {
      code: 1,
      codeText: err
    })
  })
})

// 新增员工
route.post('/add', (req, res) => {
  let {
    name = '',
    sex = 0,
    email = '',
    phone = '',
    departmentId = 0,
    jobId = 0,
    desc = ''
  } = req.body;
  // 必须要保证id的值不能重复
  req.$USERDATA.push({
    id: req.$USERDATA.length === 0 ? 1 : parseFloat(req.$USERDATA[req.$USERDATA.length - 1].id) + 1,
    name,
    password: "8376ac810bb9f231d28fcf1f",
    sex,
    email,
    phone,
    departmentId,
    jobId,
    desc,
    time: new Date().getTime(),
    state: 0
  });

  writeFile('./json/user.json', req.$USERDATA).then(() => {
    success(res);
  }).catch(err => {
    success(res, {
      code: 1,
      codeText: '新增失败'
    });
  })
});


route.post('/update', (req, res) => {
  let { userId = 0 } = req.body;
  let flag = false;
  req.$USERDATA = req.$USERDATA.map(item => {
    if (item.id == userId) {
      flag = true;
      return {
        ...item,
        ...req.body
      }
    }
    return item;
  });
  if(!flag){
    success(res,{
      code:1,
      codeText:'修改失败'
    });
    return;
  }
  writeFile('./json/user.json',req.$USERDATA).then(()=>{
      success(res)
  }).catch(err=>{
    success(res,{
      code:1,
      codeText:'对不起，修改失败'
    })
  })
})
module.exports = route;
