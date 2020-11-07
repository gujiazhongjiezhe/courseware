import {ADD_TODO,DEL_TODO,CHANGE_TODO_STATE,CHANGE_TYPE} from '../action-types';


export default {
  add(value){
    return {type:ADD_TODO,payload:value}
  },
  del(value){
    return {type:DEL_TODO,payload:value}
  },
  changeTodoState(value){
    return {type:CHANGE_TODO_STATE,payload:value}
  },
  changeType(value){
    return {type:CHANGE_TYPE,payload:value}
  }
}