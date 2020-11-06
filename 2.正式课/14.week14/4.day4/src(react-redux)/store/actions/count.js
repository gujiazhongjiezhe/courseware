import {ADD_NUM,MIN_NUM} from '../action-types';
export default {
  add(payload){

    return {type:ADD_NUM,payload}
  },
  min(payload){

    return {type:MIN_NUM,payload}
  }
}

// dispatch(add(1)) // {type:ADD_NUM,payload}