import axios from './index';

export function handleLogin(params){
  return axios.post('/user/login',params).then(res=>{
    if(res.code === 0){
      return 
    }
    else {
      return Promise.reject(res.codeText)
    }
  })
}

// 检验登录
export function checkLogin(){
  return axios.get('/user/login').then(res=>{
    if(res.code ===0){
        return
    }
    return Promise.reject(res.codeText);
  })
}

// 获取power权限
export function queryPower(){
  return axios.get('/user/power').then(res=>{
    if(res.code === 0){
        return res
    }
    return Promise.reject(res.codeText)
  })
}