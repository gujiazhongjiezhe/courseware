import axios from './axios';


// home的初始化接口
function queryInit(){
  return axios.post('/init'); // 返回值是promise实例

}

export default {
  queryInit
}