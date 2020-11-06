import {ADD_TODO} from '../action-types'
let initState = {
  list:[
    {id:1,value:'过几天我要去抢银行',isSelected:true},
    {id:2,value:'过几天我要进局子',isSelected:true},
    {id:3,value:'过几天我要越狱',isSelected:false}
  ],
  type:'all'
}

function todo (state = initState,action){
  switch(action.type){
    case ADD_TODO:
       let ary = state.list.concat({
         id:state.list.length+1,
         value:action.payload,
         isSelected:false
       });
       return {...state,list:ary}
  }
  return state;
}

export default todo;