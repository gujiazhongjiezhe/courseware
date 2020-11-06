import {ADD_TODO} from '../action-types';


export default {
  add(value){

    return {type:ADD_TODO,payload:value}
  }
}