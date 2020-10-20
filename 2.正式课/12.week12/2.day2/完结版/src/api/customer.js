import axios from './index';
// 检验登录
export function getCustomerList(params={}){
  return axios.get('/customer/list',{
    params:{
      lx:'all',
      type:'',
      search:'',
      limit:10,
      page:1,
      ...params
    }
  }).then(res=>{
    if(res.code ===0){
        return res
    }
    return Promise.reject(res.codeText);
  })
}

// 新增客户
export function addCustomer(params){
  return axios.post('/customer/add',params).then(res=>{
    if(res.code === 0){
      return 
    }
    else {
      return Promise.reject(res.codeText)
    }
  })
}

// 修改客户
export function updateCustomer(params){
  return axios.post('/customer/update',params).then(res=>{
    if(res.code === 0){
      return 
    }
    else {
      return Promise.reject(res.codeText)
    }
  })
}


// 获取客户详细信息
export function getCustomerInfo(params={}){
  return axios.get('/customer/info',{
    params
  }).then(res=>{
    if(res.code ===0){
        return res
    }
    return Promise.reject(res.codeText);
  })
}