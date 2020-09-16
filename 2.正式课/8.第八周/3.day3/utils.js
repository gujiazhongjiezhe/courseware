// 处理服务器的json数据的
function dataHandle(str){
  let ary = JSON.parse(str);
  // ary = ary.filter(item=>{
  //   return parseFloat(item.state) === 0;
  // })
  ary = ary.filter(item=> parseFloat(item.state) === 0);
  return ary;
};

// 进行二次加密的
function md5Handle(value){
  // 把密码前四位删除，然后颠倒顺序，然后在删除前四位
 return value.substring(4).split('').reverse().join('').substring(4);
}

// 封装一个返回信息的方法(统一处理服务器的返回)
function success(res,options = {}){
  res.status(200);
  res.type('application/json');
  res.send({
    code:0,
    codeText:'Ok',
    data:null,
    ...options
  })
}

// 根据jobId获取到对应的job信息
function queryJob(req,jobId){
  return req.$JOBDATA.find(item=> item.id == jobId);
}

// 通过userId获取对应人员的信息
function queryUser(req,userId){
    return req.$USERDATA.find(item=>item.id == userId);
}

function queryDepartment(req,departmentId){
  return req.$DEPARTMENTDATA.find(item=>item.id == departmentId);
}

module.exports = {
  dataHandle,
  md5Handle,
  success,
  queryJob,
  queryUser,
  queryDepartment
}