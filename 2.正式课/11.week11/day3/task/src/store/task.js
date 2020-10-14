import {queryTaskList} from '../api/task'
export default {
  namespaced:true,
  state:{
    taskList:null
  },
  mutations:{
      updateTaskList(state,payload){
        state.taskList = payload;
      }
  },
  actions:{
    updateTaskListAction({commit},payload = {}){
      // 此方法执行，会从后台请求最新的数据放到state中

        queryTaskList(payload).then(res=>{
            if(res.code === 0){
              // code是0说明数据请求成功，那就把数据赋值给state
              commit('updateTaskList',res.list);
            }
            else {
              // 如果code不是0，说明数据请求失败，把就给state一个空数组就可以了
              commit('updateTaskList',[]);
            }
        })
    }
  }
}
