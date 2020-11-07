import { ADD_TODO, DEL_TODO,CHANGE_TODO_STATE,CHANGE_TYPE} from '../action-types'
let initState = {
  list: [
    { id: 1, value: '过几天我要去抢银行', isSelected: true },
    { id: 2, value: '过几天我要进局子', isSelected: true },
    { id: 3, value: '过几天我要越狱', isSelected: false }
  ],
  type: 'all'
}

function todo(state = initState, action) {

  switch (action.type) {
    case ADD_TODO:
      let ary = state.list.concat({
        id: state.list.length + 1,
        value: action.payload,
        isSelected: false
      });
      // let ary = [...state.list,{}]
      return { ...state, list: ary };
      break;
    case DEL_TODO:
      let newAry = state.list.filter(item=>{
        return item.id !== action.payload;
      });
      return {...state,list:newAry};
      break;
    case CHANGE_TODO_STATE:
      let ss = state.list.map(item=>{
        if(item.id === action.payload){
          return {...item,isSelected :!item.isSelected}
        }
        return item;
      });
      return {...state,list:ss};
    case CHANGE_TYPE:
      return {...state,type:action.payload}
  }
  return state;
}

export default todo;