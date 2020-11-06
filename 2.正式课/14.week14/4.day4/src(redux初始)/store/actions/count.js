import {ADD_NUM,MIN_NUM} from '../action-types'
export default {
  add(value){
    // 这个位置可以发送数据的请求，把请求来得数据作为payload的值传递改store内部
    return {type:ADD_NUM,payload:value}
  },

  min(value){

    return {type:MIN_NUM,payload:value}
  }


  
}

