// 以后咱们的项目里的请求接口要和vuex中的一样，分模块管理，
// 项目里有几个大页面就会有几个对应的js文件(模块)用来分开管理每一个页面的接口请求
import axios from './index';

// 这是请求task列表的接口
export function queryTaskList(params = {}) {
 return axios.get('/getTaskList', {
    params: {
      limit: 100,
      page: 1,
      state: 0,
      ...params
    }
  })
}

// 这是新增任务的接口
export function addTaskList(data = {}) {
  return axios.post('/addTask', {
    // task:'',
    // time:'',
    ...data
   })
 }

 // 这是删除任务的接口
 export function delTask(params = {}) {
 return axios.get('/removeTask', {
    params
  })
}

 // 这是完成任务的接口
 export function finishTask(params = {}) {
  return axios.get('/completeTask', {
     params
   })
 }






// queryTaskList({state:1}).then((res)=>{
//   console.log(res);
// })